// Import resources
import axios from "axios";

// Import custom files
import { baseUrl, mailjetEmail } from "../../src/config/data";

// EXPORT HANDLER
const handler = (req, res) => {
  // POST REQUEST
  if (req.method === "POST") {
    // Get request data from body
    const reqData = req.body;

    // Debug
    //console.log("Debug apiBlank: ",);

    // Send result
    res.send("POST request works!");
  } else if (req.method === "GET") {
    // GET REQUEST
    // Send result
    res.send("GET request works!");
  } // close if reqMethod
}; // close handler

// Export
export default handler;
