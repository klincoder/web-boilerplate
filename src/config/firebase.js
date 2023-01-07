// Import resources
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithCustomToken,
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

// FUNCTIONS
// HANDLE GET DOCS
const handleGetDocs = async (docRef) => {
  // If empty args, return
  if (!docRef) return;
  const docSnap = await getDocs(docRef);
  const docData =
    docSnap.size > 0
      ? docSnap.docs.map((doc) => {
          return doc.data();
        })
      : [];
  return docData;
}; // close fxn

// HANDLE GET DOC
const handleGetDoc = async (docRef) => {
  // If empty args, return
  if (!docRef) return;
  const docSnap = await getDoc(docRef);
  const docData = docSnap.exists() ? docSnap.data() : null;
  return docData;
}; // close fxn

// Export
export {
  fireDB, // Services
  fireAuth,
  fireStorage,
  onAuthStateChanged, // Auth
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithCustomToken,
  sendEmailVerification,
  updateProfile,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  applyActionCode,
  signOut,
  onIdTokenChanged,
  doc, // Database
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
  ref, // Storage
  uploadBytesResumable,
  getDownloadURL,
  handleGetDocs, // Functions
  handleGetDoc,
};
