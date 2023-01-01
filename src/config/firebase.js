// Import resources
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  applyActionCode,
  signOut,
  onIdTokenChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  collectionGroup,
  doc,
  onSnapshot,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  increment,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// Import custom files
import { isProdEnv } from "./data";

// DEFINE VARIABLES
// DEV CONFIG
const devConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_DEV_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_DEV_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_DEV_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_DEV_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_DEV_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_DEV_APP_ID,
  databaseUrl: process.env.NEXT_PUBLIC_FIREBASE_DEV_DATABASE_URL,
};

// PROD CONFIG
const prodConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PROD_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_PROD_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROD_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_PROD_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_PROD_APP_ID,
  databaseUrl: process.env.NEXT_PUBLIC_FIREBASE_PROD_DATABASE_URL,
};

// FINAL CONFIG
const finalConfig = isProdEnv ? prodConfig : devConfig;

// INITIALZE APP
// Check app initialzation
const app = getApps().length > 0 ? getApp() : initializeApp(finalConfig);

// Define firebase services
const fireDB = getFirestore(app);
const fireAuth = getAuth(app);
const fireStorage = getStorage(app);

// // FUNCTIONS
// // HANDLE GET DOCS
// const handleGetDoc = async (docRef, data) => {
//   // If empty args, return
//   if (!docRef || !data) return;
//   const pageRef = doc(fireDB, "app_settings", "page_home");
//   const pageSnap = await getDoc(pageRef);
//   const pageData = pageSnap.data();
//   return await setDoc(docRef, data);
// }; // close fxn

// // HANDLE SET DOC
// const handleSetDoc = async (docRef, data) => {
//   // If empty args, return
//   if (!docRef || !data) return;
//   return await setDoc(docRef, data);
// }; // close fxn

// // HANDLE MERGE DOC
// const handleMergeDoc = async (docRef, data) => {
//   // If empty args, return
//   if (!docRef || !data) return;
//   return await setDoc(docRef, data, { merge: true });
// }; // close fxn

// Export
export {
  fireDB,
  fireAuth,
  fireStorage,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  applyActionCode,
  signOut,
  onIdTokenChanged,
  doc,
  collection,
  collectionGroup,
  onSnapshot,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  increment,
  arrayUnion,
  serverTimestamp,
  ref,
  uploadBytesResumable,
  getDownloadURL,
};
