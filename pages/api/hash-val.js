// Import resources
import axios from "axios";
import bcryptjs from "bcryptjs";

// Import custom files
import { baseUrl } from "../../src/config/data";

// Handler
const handler = async (req, res) => {
  // HANDLE POST REQUEST
  if (req.method === "POST") {
    // Get body data
    const reqData = req.body;
    const rawVal = reqData?.val;
    const action = reqData?.action;
    const rawHashed = reqData?.hashedVal;

    // Debug
    //console.log("Debug apiHashVal: ", reqData);
    //res.send(reqData);

    // FUNCTIONS
    // HANDLE HASH VAL
    const handleHashVal = (rawVal) => {
      // If empty args, return
      if (!rawVal) return null;
      return bcryptjs.hashSync(rawVal);
    }; // close fxn

    // HANDLE COMPARE HASH VAL
    const handleCompareHashVal = (newVal, hashedVal) => {
      // If empty args, return
      if (!newVal || !hashedVal) return null;
      return bcryptjs.compareSync(newVal, hashedVal);
    }; // close fxn

    // If action
    if (action) {
      // Define variables
      let result;

      // Switch action
      switch (action) {
        case "hash":
          result = handleHashVal(rawVal);
          res.status(200).send(result);
          break;

        case "compare":
          result = handleCompareHashVal(rawVal, rawHashed);
          res.status(200).send(result);
          break;

        default:
          result = "Invalid action";
          res.status(400).send(result);
          break;
      } // close switch
    } else {
      res.status(400).send();
    } // close if
  } else if (req.method === "GET") {
    // HANDLE GET REQUEST
    // Send result
    res.send("GET request works!");
  } // close if reqMethod
}; // close handler

// Export
export default handler;
