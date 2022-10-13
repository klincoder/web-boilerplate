// Import resources
import * as firebaseAdmin from "firebase-admin";

// INITIALIZE APP
if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID,
    }),
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  });
} // close if

// FUNCTIONS
// HANDLE VERIFY TOKEN
const handleVerifyIdToken = async (ftoken) => {
  // If ftoken
  if (ftoken) {
    // Define variables
    const result = await firebaseAdmin.auth().verifyIdToken(ftoken);
    const id = result?.uid;
    const username = result?.name;
    const email = result?.email;
    const emailVerified = result?.email_verified;
    return { id, username, email, emailVerified };
  } else {
    return false;
  } // close if
}; // close fxn

// Export
export { firebaseAdmin, handleVerifyIdToken };
