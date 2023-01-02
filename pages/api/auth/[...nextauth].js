// Import resources
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";

// Import custom files
import { isProdEnv } from "../../../src/config/data";
import {
  handleFireAdminAction,
  handleIsEmail,
} from "../../../src/config/functions";
import {
  fireDB,
  collection,
  limit,
  where,
  query,
  getDocs,
  signInWithCustomToken,
  fireAuth,
} from "../../../src/config/firebase";

// Debug
//console.log("Debug nextAuth: ", process.env.NEXTAUTH_SECRET);

// Export
export default NextAuth({
  debug: !isProdEnv,
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/login", error: "/auth/login" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { type: "email", label: "Email Address" },
        password: { type: "password", label: "Password" },
      }, // close credentials
      async authorize(credentials, req) {
        // Try catch
        try {
          // Get db user with credentials
          // const isEmail = handleIsEmail(credentials.email);
          // const field = isEmail ? "email_address" : "username";
          const userRef = query(
            collection(fireDB, "users"),
            where("email_address", "==", credentials.email),
            limit(1)
          );
          const userSnap = await getDocs(userRef);
          const userSize = userSnap.size;

          // If userSize > 0
          if (userSize > 0) {
            // Define currUser
            const currUser = userSnap.docs.map((doc) => {
              const data = doc.data();
              return {
                id: data?.user_id,
                role: data?.role,
                avatar: data?.avatar,
                fullName: data?.full_name,
                username: data?.username,
                emailAddress: data?.email_address,
                password: data?.password,
                phoneNumber: data?.phone_number,
              };
            })?.[0];

            // Verify pass
            const verifyPass = bcryptjs.compareSync(
              credentials.password,
              currUser?.password
            );

            // Debug
            //console.log("Debug authorize: ", { userSize, verifyPass });

            // If currUser
            if (currUser && verifyPass) {
              // // Login into firebase with custom token
              // await signInWithCustomToken(fireAuth, "customToken");
              return currUser;
            } else {
              return null;
            } // close if
          } else {
            return null;
          } // close if
        } catch (err) {
          //console.log("Debug authorize: ", err.message);
        } // close try catch
      }, // close authorize
    }), // close credentials provider
  ], // close providers
  callbacks: {
    async jwt({ token, user, account }) {
      // If account and user
      if (account && user) {
        delete user?.password;
        return { ...token, user };
      } // close if
      //console.log("Debug JWT: ", { user, token, account });
      return token;
    }, // close jwt
    async session({ session, token }) {
      session.user = token.user;
      //console.log("Debug SESSION: ", { session, token });
      return session;
    }, // close session
  }, // close callbacks
}); // close export
