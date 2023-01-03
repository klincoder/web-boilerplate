// Import resources

// Import custom files
import { baseUrl, mailjetEmail } from "../../src/config/data";

// Handler
const handler = async (req, res) => {
  // HANDLE POST REQUEST
  if (req.method === "POST") {
    // Get body data
    const reqData = req.body;
    const msg = reqData?.msg;
    const tempID = reqData?.tempID;

    // Define variables
    const toName = msg?.toName;
    const toEmail = msg?.toEmail;
    const fromName = msg?.fromName || "Klincoder";
    const fromEmail = msg?.fromEmail || "noreply@klincoder.com";
    const otpCode = msg?.otp;

    // Debug
    //console.log("Debug apiOtp: ", reqData);
    //res.send(reqData);

    // If empty args
    if (!toName || !toEmail || !tempID || !otpCode) {
      res.send("Bad request. Check your values.");
      return;
    } // close if

    // Try catch
    try {
      // Send email and await request
      await mailjetEmail
        .post("send", { version: "v3.1" })
        .request({
          Messages: [
            {
              From: {
                Email: fromEmail,
                Name: fromName,
              }, // close from
              To: [
                {
                  Email: toEmail,
                  Name: toName,
                },
              ], // close to
              //Subject: "Subject",
              TemplateID: tempID,
              TemplateLanguage: true,
              Variables: {
                to_name: toName,
                from_name: fromName,
                otp_code: otpCode,
              },
            }, // close messages obj
          ], // close messages
        })
        .then((apiRes) => {
          // Define resData
          const resData = apiRes?.body;
          const status = resData?.Messages?.[0]?.Status;
          //console.log("Debug apiOtp: ", resData);
          res.send(status);
        });
    } catch (err) {
      res.send(err.message);
      console.log("Debug apiOtp: ", err.message);
    } // close try catch
  } else if (req.method === "GET") {
    // HANDLE GET REQUEST
    // Send result
    res.send("GET request works!");
  } // close if reqMethod
}; // close handler

// Export
export default handler;
