// Import resources

// Import custom files
import { baseUrl, mailjetEmail } from "../../src/config/data";

// Handler
const handler = async (req, res) => {
  // HANDLE POST REQUEST
  if (req.method === "POST") {
    // Get body data
    const reqData = req.body;
    const toName = reqData?.toName;
    const toEmail = reqData?.toEmail;
    const fromName = reqData?.fromName;
    const fromEmail = reqData?.fromEmail;
    const msg = reqData?.msg;

    // Define variables
    const otpCode = msg?.otp;

    // Debug
    //console.log("Debug apiBlank: ",);
    //res.send("Sent!");

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
              TemplateID: 1,
              TemplateLanguage: true,
              Variables: {
                to_name: toName,
                from_name: fromName,
              },
            }, // close messages obj
          ], // close messages
        })
        .then((res) => {
          // Define resData
          const resData = res?.body;
          const status = resData?.Messages?.[0]?.Status;
          //console.log("Debug apiBlank: ", resData);
          res.send(status);
        });
    } catch (err) {
      res.send(err.message);
      console.log("Debug apiBlank: ", err.message);
    } // close try catch
  } else if (req.method === "GET") {
    // HANDLE GET REQUEST
    // Send result
    res.send("GET request works!");
  } // close if reqMethod
}; // close handler

// Export
export default handler;
