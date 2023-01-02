// Import resources
import axios from "axios";
import * as firebaseAdmin from "firebase-admin";

// Import custom files
import { actionSettings, baseUrl, isProdEnv } from "../../src/config/data";

// Define config
const devConfig = {
  clientEmail: process.env.FIREBASE_ADMIN_DEV_CLIENT_EMAIL,
  projectId: process.env.FIREBASE_ADMIN_DEV_PROJECT_ID,
  privateKey: process.env.FIREBASE_ADMIN_DEV_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};
const prodConfig = {
  clientEmail: process.env.FIREBASE_ADMIN_PROD_CLIENT_EMAIL,
  projectId: process.env.FIREBASE_ADMIN_PROD_PROJECT_ID,
  privateKey: process.env.FIREBASE_ADMIN_PROD_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  ),
};
const finalConfig = isProdEnv ? prodConfig : devConfig;

// Initialize app
if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(finalConfig),
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  });
} // close if

// Define admin services
const adminAuth = firebaseAdmin.app().auth();

// Handler
const handler = async (req, res) => {
  // HANDLE POST REQUEST
  if (req.method === "POST") {
    // Get body data
    const reqData = req.body;
    const action = reqData?.action;
    const emailAddr = reqData?.email;

    // Debug
    //console.log("Debug apiBlank: ",);

    // FUNCTIONS
    // HANDLE CUSTOM TOKEN
    const handleCustomToken = async () => {
      if (!emailAddr) return "Email is required";
      const getUser = await adminAuth.getUserByEmail(emailAddr);
      return await adminAuth.createCustomToken(getUser?.uid);
    }; // closoe fxn

    // HANDLE VERIFY EMAIL LINK
    const handleVerifyEmailLink = async () => {
      if (!emailAddr) return "Email is required";
      return await adminAuth.generateEmailVerificationLink(
        emailAddr,
        actionSettings
      );
    }; // closoe fxn

    // if action
    if (action) {
      // Try catch
      try {
        // Define variables
        let result;
        // Switch
        switch (action) {
          case "custom-token":
            result = await handleCustomToken();
            break;
          case "email-link":
            result = await handleVerifyEmailLink();
            break;

          default:
            result = "Invalid action";
            break;
        } // close switch
        // Send result
        res.send(result);
      } catch (err) {
        res.send(err.message);
        //console.log("Debug auth: ", err.message);
      } // close try catch
    } else {
      res.send("Missing action field");
    } // close if
  } else if (req.method === "GET") {
    // HANDLE GET REQUEST
    // Send result
    res.send("GET request works!");
  } // close if reqMethod
}; // close handler

// Export
export default handler;
