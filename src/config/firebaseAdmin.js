// Import resources
import * as firebaseAdmin from "firebase-admin";

// Import custom files
import { isProdEnv } from "./data";
import { fireDB, doc, getDoc } from "./firebase";
import { handleDayJsFormat } from "./functions";

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
    const verifyToken = await firebaseAdmin.auth().verifyIdToken(ftoken);
    // Get user info from db
    const userRef = doc(fireDB, "users", verifyToken?.uid);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.exists() ? userSnap.data() : null;
    // Define current user
    const currUser = {
      id: verifyToken?.uid,
      email: verifyToken?.email,
      emailVerified: verifyToken?.emailVerified,
      lastLogin: handleDayJsFormat(verifyToken?.metadata?.lastSignInTime, 2),
      avatar: userData?.avatar,
      role: userData?.role,
      fullName: userData?.full_name,
      username: userData?.username,
      phone: userData?.phone_number,
      pushStatus: userData?.push_status,
    };
    // If email verified
    if (currUser?.emailVerified) {
      return currUser;
    } else {
      return false;
    } // close if
  } catch (err) {
    console.log("Debug handleVerifyIdToken: ", err.message);
    return false;
  } // close try catch
}; // close fxn

// Export
export { firebaseAdmin, handleVerifyIdToken };
