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
    const fromName = msg?.fromName;
    const fromEmail = msg?.fromEmail;
    const year = msg?.year;
    const date = msg?.date;

    // Debug
    //console.log("Debug apiBlank: ", reqData);
    //res.send(reqData);

    // If empty args
    if (!toName || !toEmail || !tempID) {
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
                from_name: fromName, // Default
                year: year,
                date: date,
                to_name: toName, // Custom
                otp_code: msg?.otp,
                verify_link: msg?.link,
              },
            }, // close messages obj
          ], // close messages
        })
        .then((apiRes) => {
          // Define resData
          const resData = apiRes?.body;
          const status = resData?.Messages?.[0]?.Status;
          //console.log("Debug apiBlank: ", resData);
          res.send(status);
        });
    } catch (err) {
      res.send(err.message);
      //console.log("Debug apiBlank: ", err.message);
    } // close try catch
  } else if (req.method === "GET") {
    // HANDLE GET REQUEST
    // Send result
    res.send("GET request works!");
  } // close if reqMethod
}; // close handler

// Export
export default handler;
