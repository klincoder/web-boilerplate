// Import resources
import axios from "axios";

// Import custom files
import { actionSettings, baseUrl, mailjetEmail } from "../../src/config/data";

// Handler
const handler = async (req, res) => {
  // HANDLE POST REQUEST
  if (req.method === "POST") {
    // Get body data
    const reqData = req.body;

    // Define variables
    const toName = reqData?.toName;
    const toEmail = reqData?.toEmail;
    const fromName = reqData?.fromName;
    const fromEmail = reqData?.fromEmail;

    // Debug
    //console.log("Debug apiBlank: ",);
    res.send("Sent!");

    //  // Send email and await request
    //  await mailjetEmail
    //  .post("send", { version: "v3.1" })
    //  .request({
    //    Messages: [
    //      {
    //        From: {
    //          Email: fromEmail,
    //          Name: fromName,
    //        },
    //        To: [
    //          {
    //            Email: toEmail,
    //            Name: toName,
    //          },
    //        ],
    //        Subject: "Verify your email",
    //        HTMLPart: `
    //          <div style="font-size: 14px;">
    //          <h3>Hi, ${toName}</h3>
    //          <p>Follow this link to confirm your email adress.</p>
    //          <p><a href="https://${getLink}/contact" style="font-weight: 600;">Email confirmation link.</a></p>
    //          <p>If this wasn't you, please <a href="https://${baseUrl}/contact" style="font-weight: 600;">contact support</a> immediately.</p>
    //          <br />
    //          <div>Best regards,</div>
    //          <div>${fromName}</div>
    //          </div>
    //        `,
    //      },
    //    ],
    //  })
    //  .then((apiRes) => {
    //    // Define resData
    //    const resData = apiRes?.body;
    //    const status = resData?.Messages?.[0]?.Status;
    //    //console.log("Debug apiLoginEmail 1: ", resData);
    //    res.send(status);
    //  })
    //  .catch((err) => {
    //    //console.log("Debug apiLoginEmail 2: ", err.message);
    //    res.send(err.message);
    //  });// close mailjet email
  } else if (req.method === "GET") {
    // HANDLE GET REQUEST
    // Send result
    res.send("GET request works!");
  } // close if reqMethod
}; // close handler

// Export
export default handler;
