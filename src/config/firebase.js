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
// FIREBASE DEV CONFIG
const firebaseDev = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_DEV_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_DEV_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_DEV_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_DEV_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_DEV_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_DEV_APP_ID,
  databaseUrl: process.env.NEXT_PUBLIC_FIREBASE_DEV_DATABASE_URL,
};

// FIREBASE PROD CONFIG
const firebaseProd = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PROD_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_PROD_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROD_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_PROD_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_PROD_APP_ID,
  databaseUrl: process.env.NEXT_PUBLIC_FIREBASE_PROD_DATABASE_URL,
};

// FIREBASE CONFIG
const firebaseConfig = isProdEnv ? firebaseProd : firebaseDev;

// INITIALZE APP
// Check app initialzation
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseDev);

// Define firebase services
const fireDB = getFirestore(app);
const fireAuth = getAuth(app);
const fireStorage = getStorage(app);

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
  ref,
  uploadBytesResumable,
  getDownloadURL,
};
