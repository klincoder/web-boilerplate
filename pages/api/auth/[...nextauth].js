// Import resources
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import {
  fireDB,
  collection,
  limit,
  where,
  query,
  getDocs,
  fireAuth,
  signInWithCustomToken,
} from "../../../src/config/firebase";

// Component
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email Address",
          type: "email",
          placeholder: "Enter your email address",
        }, // close email input
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        }, // close password input
      }, // close credentials
      async authorize(credentials, req) {
        // Define currUser
        let currUser;
        // Get user from database based on credentials
        // Get user details by username
        const getUsernameRef = query(
          collection(fireDB, "users"),
          where("username", "==", credentials.email),
          limit(1)
        );
        const getUsernameSnap = await getDocs(getUsernameRef);
        const getUsernameSize = getUsernameSnap.size;
        // Get user details by email
        const getEmailRef = query(
          collection(fireDB, "users"),
          where("emailAddress", "==", credentials.email),
          limit(1)
        );
        const getEmailSnap = await getDocs(getEmailRef);
        const getEmailSize = getEmailSnap.size;
        // If getUsernameSize > 0
        if (getUsernameSize > 0) {
          // Set currUser
          currUser = getUsernameSnap.docs.map((doc) => {
            // Return
            return {
              userID: doc.data().userID,
              fullName: doc.data().fullName,
              username: doc.data().username,
              emailAddress: doc.data().emailAddress,
              phoneNumber: doc.data().phoneNumber,
              password: doc.data().password,
              role: doc.data().role,
            };
          });
        } else {
          // Set currUser
          currUser = getEmailSnap.docs.map((doc) => {
            // Return
            return {
              userID: doc.data().userID,
              fullName: doc.data().fullName,
              username: doc.data().username,
              emailAddress: doc.data().emailAddress,
              phoneNumber: doc.data().phoneNumber,
              password: doc.data().password,
              role: doc.data().role,
            };
          });
        } // close if getUsernameSize
        // Verify pass
        const verifyPass = bcryptjs.compareSync(
          credentials.password,
          currUser[0]?.password
        );
        // Debug
        //console.log("Debug apiNextAuth: ", credentials.email)
        // If currUser
        if (currUser && verifyPass) {
          return currUser;
        } else {
          return null;
        } // close if currUser
      }, // close authorize
    }), // close credentials provider
  ], // close providers
  pages: {
    signIn: "/login",
  }, // close pages
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      // Debug
      //console.log("Debug apiNextAuth: ", user);
      // If account and user
      if (account && user) {
        return {
          ...token,
          userDetails: user,
        };
      } // close if account
      // Return token
      return token;
    }, // close jwt
    async session({ session, token }) {
      session.user = token.userDetails[0];
      //const genToken = token.jti;
      // Sign into firebase with custom token
      // const customTokenLogin = await signInWithCustomToken(fireAuth, genToken);
      // const authFireUser = customTokenLogin.user;
      // console.log("Debug sessionCallback: ", { token, genToken, authFireUser });
      return session;
    }, // close session
  }, // close callbacks
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
  }, // close jat
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
}); // close component
