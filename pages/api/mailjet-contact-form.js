// Import resources
// Import custom files
import { baseUrl, mailjetEmail } from "../../src/config/data";

// EXPORT HANDLER
export default async function handler(req, res) {
  // If req.method === POST
  if (req.method === "POST") {
    // HANDLE POST REQUEST
    // Get request data from body
    const reqData = req.body;
    const reqToName = reqData?.toName;
    const reqToEmail = reqData?.toEmail;
    const reqFromName = reqData?.fromName;
    const reqFromEmail = reqData?.fromEmail;
    const reqFooterName = reqData?.footerName;
    const reqMsg = reqData?.msg;
    const emailSubj = reqMsg?.subject;
    const emailMsg = reqMsg?.msg;
    const emailSender = reqData?.sender;

    // Debug
    //console.log("Debug apiContactSupport: ",);

    // Send email and await request
    await mailjetEmail
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: reqFromEmail,
              Name: reqFromName,
            },
            To: [
              {
                Email: reqToEmail,
                Name: reqToName,
              },
            ],
            Subject: "Contact Form",
            HTMLPart: `
              <div style="font-size: 14px;">
              <h3>Hi, ${reqToName}</h3>
              <p>You have a new contact form message.</p>
              <div><span style="font-weight: 600;">Sender:</span> ${emailSender}</div>
              <div><span style="font-weight: 600;">Subject:</span> ${emailSubj}</div>
              <div><span style="font-weight: 600;">Message:</span> ${emailMsg}</div>
              <br />
              <div>Best regards,</div>
              <div>${reqFooterName}</div>
              </div>
            `,
          },
        ],
      })
      .then((apiRes) => {
        // Define resData
        const resData = apiRes?.body;
        const status = resData?.Messages?.[0]?.Status;
        //console.log("Debug apiContactSupport: ", status);
        // Send result
        res.send(status);
      })
      .catch((err) => {
        //console.log("Error apiContactSupport: ", err.message);
        res.send(err.statusCode);
      });
  } else if (req.method === "GET") {
    // HANDLE GET REQUEST
    res.send("GET request works!");
  } // close if reqMethod
} // close handler
