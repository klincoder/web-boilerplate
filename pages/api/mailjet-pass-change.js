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
    // console.log("Debug apiPassChange: ", reqData);
    // res.send(reqData);

    // Try catch
    try {
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
              Subject: "Password Change Alert",
              HTMLPart: `
              <div style="font-size: 14px;">
              <h3>Hi, ${reqToName}</h3>
              <p>Successful password change alert.</p>
              <p><span style="font-weight: 600;">Date:</span> ${reqMsg}</p>
              <p>If this wasn't you, please <a href="https://genesissupportltd.com/contact" style="font-weight: 600;">contact support</a> immediately.</p>
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
          //console.log("Debug apiPassChangeEmail: ", status);
          // Send result
          res.send(status);
        });
    } catch (err) {
      res.send(err.message);
      //console.log("Error apiPassChangeEmail: ", err.message);
    } // close try catch
  } else if (req.method === "GET") {
    // HANDLE GET REQUEST
    res.send("GET request works!");
  } // close if reqMethod
}; // close handler

// Export
export default handler;
