// Import resources
import { initializeApp, applicationDefault } from "firebase-admin/app";

// Init app
const fireAdminAuth = initializeApp({
  credential: applicationDefault(),
  //databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});

// Export
export { fireAdminAuth };
