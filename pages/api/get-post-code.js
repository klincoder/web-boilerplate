// Import resources
// Import custom files
import axios from "axios";
import { baseUrl, mailjetEmail } from "../../src/config/data";

// EXPORT HANDLER
export default async function handler(req, res) {
  if (req.method === "POST") {
    // HANDLE POST REQUEST
    // Get request data from body
    const reqData = req.body;
    const reqPostCode = reqData?.postCode;

    // Try catch
    try {
      // Get result
      const result = await axios({
        method: "GET",
        url: "https://samsinfield-postcodes-4-u-uk-address-finder.p.rapidapi.com/ByPostcode/json",
        params: { postCode: reqPostCode },
        headers: {
          Accept: "application/json",
          "X-RapidAPI-Key": `${process.env.NEXT_PUBLIC_RAPID_API_KEY}`,
          "X-RapidAPI-Host":
            "samsinfield-postcodes-4-u-uk-address-finder.p.rapidapi.com",
        },
      });
      // Send result
      res.status(200).send(result?.data);
    } catch (err) {
      res.status(400).send(err.message);
    } // close try catch
  } else if (req.method === "GET") {
    // HANDLE GET REQUEST
    // Send result
    res.send("GET request works!");
  } // close if reqMethod
} // close handler
