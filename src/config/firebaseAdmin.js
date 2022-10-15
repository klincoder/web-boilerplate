// Import resources
import * as firebaseAdmin from "firebase-admin";

// Import custom files
import { isProdEnv } from "./data";
import { fireDB, doc, getDoc } from "./firebase";

// DEFINE VARIABLES
// DEV CONFIG
const devConfig = {
  clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_DEV_CLIENT_EMAIL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_DEV_PROJECT_ID,
  privateKey: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_DEV_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  ),
};

// PROD CONFIG
const prodConfig = {
  clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROD_CLIENT_EMAIL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROD_PROJECT_ID,
  privateKey: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROD_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  ),
};

// FINAL CONFIG
const finalConfig = isProdEnv ? prodConfig : devConfig;

// INITIALIZE APP
if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(finalConfig),
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  });
} // close if

// FUNCTIONS
// HANDLE VERIFY TOKEN
const handleVerifyIdToken = async (ftoken) => {
  // If empty args, return
  if (!ftoken) return false;
  // Try catch
  try {
    // Verify id token
    const verifiedToken = await firebaseAdmin.auth().verifyIdToken(ftoken);
    // Get user info from db
    const getUserRef = doc(fireDB, "users", verifiedToken?.uid);
    const getUserSnap = await getDoc(getUserRef);
    const getUserData = getUserSnap.exists() ? getUserSnap.data() : null;
    // Define variables
    const id = verifiedToken?.uid;
    const email = verifiedToken?.email;
    const emailVerified = verifiedToken?.email_verified;
    const role = getUserData?.role;
    const username = getUserData?.username;
    // Return
    return { id, username, role, email, emailVerified };
  } catch (err) {
    console.log("Debug handleVerifyIdToken: ", err.message);
    return false;
  } // close try catch
}; // close fxn

// Export
export { firebaseAdmin, handleVerifyIdToken };
