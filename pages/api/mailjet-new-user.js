// Import resources

// Import custom files
import { baseUrl, mailjetEmail } from "../../src/config/data";

// Handler
const handler = async (req, res) => {
  // HANDLE POST REQUEST
  if (req.method === "POST") {
    // Get request data from body
    const reqData = req.body;
    const reqToName = reqData?.toName;
    const reqToEmail = reqData?.toEmail;
    const reqFromName = reqData?.fromName;
    const reqFromEmail = reqData?.fromEmail;
    const reqFooterName = reqData?.footerName;
    const reqMsg = reqData?.msg;

    // Debug
    //console.log("Debug apiNewUser: ",);

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
            Subject: "New User Alert",
            HTMLPart: `
            <div style="font-size: 14px;">
              <h3>Hi, ${reqToName}</h3>
              <p>You have a new user registration.</p>
              <div><span style="font-weight: 600;">Username:</span> ${reqMsg?.username}</div>
              <div><span style="font-weight: 600;">Email Address:</span> ${reqMsg?.email}</div>
              <div><span style="font-weight: 600;">Date:</span> ${reqMsg?.date}</div>
              <p><a href="${baseUrl}/cms/all-users" style="font-weight: 600;">Login</a> for more details.</p>
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
        //console.log("Debug apiNewUserEmail: ", status);
        // Send result
        res.send(status);
      })
      .catch((err) => {
        //console.log("Error apiNewUserEmail: ", err.message);
        res.send(err.statusCode);
      });
  } else if (req.method === "GET") {
    // HANDLE GET REQUEST
    res.send("GET request works!");
  } // close if reqMethod
}; // close handler

// Export
export default handler;
