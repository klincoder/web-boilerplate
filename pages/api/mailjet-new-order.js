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
    const reqRole = reqData?.role;
    const reqToName = reqData?.toName;
    const reqToEmail = reqData?.toEmail;
    const reqFromName = reqData?.fromName;
    const reqFromEmail = reqData?.fromEmail;
    const reqFooterName = reqData?.footerName;
    const reqMsg = reqData?.msg;

    // Define eamil info
    const isUserRole = reqRole === "user";
    const username = reqMsg?.username;
    const tranxRef = reqMsg?.tranxRef;
    const products = reqMsg?.products;
    const tranxAmtTotal = reqMsg?.totalAmt;
    const tranxDate = reqMsg?.date;
    const emailMsgUser = `
    <p>Thanks for your order.</p>
    <div><span style="font-weight: 600;">Products - </span> ${products}</div>
    <div><span style="font-weight: 600;">Total Amount - </span> ${tranxAmtTotal}</div>
    <div><span style="font-weight: 600;">Transaction Ref - </span> ${tranxRef}</div>
    <div><span style="font-weight: 600;">Date - </span> ${tranxDate}</div>
    <p><a href="${baseUrl}/cms/my-orders" style="font-weight: 600;">Login</a> for more details.</p>
    `;
    const emailMsgAdmin = `
    <p>Congratulations, you have a new order.</p>
    <div><span style="font-weight: 600;">Username - </span> ${username}</div>
    <div><span style="font-weight: 600;">Product - </span> ${products}</div>
    <div><span style="font-weight: 600;">Total Amount - </span> ${tranxAmtTotal}</div>
    <div><span style="font-weight: 600;">Transaction Ref - </span> ${tranxRef}</div>
    <div><span style="font-weight: 600;">Date - </span> ${tranxDate}</div>
    <p><a href="${baseUrl}/cms/all-orders" style="font-weight: 600;">Login</a> for more details.</p>
    `;
    const finalEmailMsg = isUserRole ? emailMsgUser : emailMsgAdmin;

    // Debug
    //console.log("Debug apiUserTranx: ",);

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
            Subject: `Transaction Alert [${tranxRef}]`,
            HTMLPart: `
              <div style="font-size: 14px;">
              <h3>Hi, ${reqToName}</h3>
              <div>${finalEmailMsg}</div>
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
        //console.log("Debug apiLoginEmail: ", status);
        // Send result
        res.send(status);
      })
      .catch((err) => {
        //console.log("Error apiLoginEmail: ", err.message);
        res.send(err.statusCode);
      });
  } else if (req.method === "GET") {
    // HANDLE GET REQUEST
    res.send("GET request works!");
  } // close if reqMethod
} // close handler
