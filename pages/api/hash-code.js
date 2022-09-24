// Import resources
import bcryptjs from "bcryptjs";

// Import custom files
import { baseUrl } from "../../src/config/data";

// EXPORT HANDLER
export default async function handler(req, res) {
  // If req.method === POST
  if (req.method === "POST") {
    // HANDLE POST REQUEST
    // Get request data from body
    const reqData = req.body;
    const reqCode = reqData?.code;

    // Debug
    //console.log("Debug apiHashCode: ",);

    // If reqCode is empty
    if (typeof reqCode != "string" || reqCode === "") {
      res.status(400).send();
    } else {
      // Define hashed reqCode
      const hashedCode = bcryptjs.hashSync(reqCode, 5);
      res.status(200).send(hashedCode);
    } // close if empty
  } else if (req.method === "GET") {
    // HANDLE GET REQUEST
    // Send result
    res.status(200).send("GET request works!");
  } // close if reqMethod
} // close handler
