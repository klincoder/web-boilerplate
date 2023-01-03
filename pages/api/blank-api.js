// Import resources
import axios from "axios";

// Import custom files
import { baseUrl } from "../../src/config/data";

// Handler
const handler = async (req, res) => {
  // HANDLE POST REQUEST
  if (req.method === "POST") {
    // Get body data
    const reqData = req.body;

    // Debug
    //console.log("Debug apiBlank: ", reqData);
    //res.send(reqData);

    // Send result
    res.send("POST request works!");
  } else if (req.method === "GET") {
    // HANDLE GET REQUEST
    // Send result
    res.send("GET request works!");
  } // close if reqMethod
}; // close handler

// Export
export default handler;
