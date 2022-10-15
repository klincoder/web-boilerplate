// Import resources
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import nookies from "nookies";

// Import custom files
import useAppSettings from "../hooks/useAppSettings";
import { handleFormatDate, handleSendEmail } from "../config/functions";
import { allUsersAtom } from "../recoil/atoms";
import { alertMsg, apiRoutes, baseUrl } from "../config/data";
import {
  createUserWithEmailAndPassword,
  doc,
  fireAuth,
  fireDB,
  onAuthStateChanged,
  onIdTokenChanged,
  onSnapshot,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  applyActionCode,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "../config/firebase";

// Create context
const AuthContext = createContext({});

// Create context hook
export const useAuthContext = () => useContext(AuthContext);

// Create context provider
export const AuthContextProvider = ({ children }) => {
  // Define state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const allUsers = useRecoilValue(allUsersAtom);

  // Define app settings
  const { todaysDate2, router, alert } = useAppSettings();

  // Define variables
  const fireUserID = fireAuth?.currentUser?.uid;
  const actionCodeSettings = {
    url: baseUrl,
  };

  // Debug
  //console.log("Debug authContext: ", user)

  // FUNCTONS
  // HANDLE EMAIL EXIST
  const handleEmailExist = (emailAddr) => {
    // If empty args, return
    if (!emailAddr) return;
    // Filter emailAddr
    const filterEmailAddr = allUsers?.filter(
      (item) => item?.emailAddress === emailAddr
    );
    const isValid = filterEmailAddr?.length > 0;
    const data = filterEmailAddr[0];
    return { isValid, data };
  }; // close fxn

  // HANDLE USERNAME EXIST
  const handleUsernameExist = (username) => {
    // If empty args, return
    if (!username) return;
    // Filter username
    const filterUsername = allUsers?.filter(
      (item) => item?.username === username
    );
    const isValid = filterUsername?.length > 0;
    const data = filterUsername[0];
    return { isValid, data };
  }; // close fxn

  // HANDLE REGISTER
  const handleRegister = async (username, email, pass) => {
    // If empty arg, return
    if (!username || !email || !pass) return;
    return await createUserWithEmailAndPassword(fireAuth, email, pass).then(
      async (res) => {
        // Send verification link
        await sendEmailVerification(res.user, actionCodeSettings);
        await updateProfile(res.user, { displayName: username });
      }
    );
  }; // close fxn

  // HANDLE LOGIN
  const handleLogin = async (email, pass) => {
    // If empty arg, return
    if (!email || !pass) return;
    return await signInWithEmailAndPassword(fireAuth, email, pass);
  }; // close fxn

  // HANDLE LOGOUT
  const handleLogout = async () => {
    // Set user
    setUser(null);
    await signOut(fireAuth);
    alert.success(alertMsg?.logoutSucc);
    router.replace("/");
  }; // close fxn

  // HANDLE SEND EMAIL VERIFY LINK
  const handleSendEmailVerifyLink = async (currUser) => {
    // If empty args, return
    if (!currUser) return;
    return await sendEmailVerification(currUser, actionCodeSettings);
  }; // close fxn

  // HANDLE SEND PASSWORD RESET LINK
  const handleSendPassResetLink = async (currUser, emailAddr) => {
    // If empty args, return
    if (!currUser || !emailAddr) return;
    return await sendPasswordResetEmail(
      currUser,
      emailAddr,
      actionCodeSettings
    );
  }; // close fxn

  // HANDLE VERIFY EMAIL
  const handleVerifyEmail = async (actionCode) => {
    // If empty args, return
    if (!actionCode) return;
    return await applyActionCode(fireAuth, actionCode);
  }; // close fxn

  // HANDLE RESET PASSWORD
  const handleResetPassword = async (actionCode, newPass) => {
    // If empty args, return
    if (!actionCode || !newPass) return;
    // Verify the password reset code is valid
    return await verifyPasswordResetCode(fireAuth, actionCode).then(
      async (email) => {
        // Define variables
        const emailExist = handleEmailExist(email);
        const userInfo = emailExist?.data;
        // Confirm new password (save to firebase auth)
        await confirmPasswordReset(fireAuth, actionCode, newPass).then(
          async () => {
            // Send pass change alert
            await handleSendEmail(
              "user",
              userInfo?.username,
              userInfo?.email,
              todaysDate2,
              apiRoutes?.passChange
            );
          }
        );
      }
    ); // close return
  }; // close fxn

  // HANDLE IS SUPER ADMIN
  const handleIsSuperAdmin = (username) => {
    // If empty args, return
    if (!username) return;
    return username?.toLowerCase() === "klincoder";
  }; // close fxn

  // SIDE EFFECTS
  // LISTEN TO AUTH STATE
  useEffect(() => {
    // On mount
    const unsubscribe = onIdTokenChanged(fireAuth, async (currUser) => {
      // If currUser
      if (currUser?.emailVerified) {
        // Get token
        const token = await currUser.getIdToken();
        nookies.set(undefined, "ftoken", token, { path: "/" });
        // Listen to more user info from database
        const userInfoRef = doc(fireDB, "users", currUser?.uid);
        onSnapshot(userInfoRef, (snapshot) => {
          // Define variables
          const dbUser = snapshot.data();
          const currUserObj = {
            id: currUser?.uid,
            email: currUser?.email,
            emailVerified: currUser?.emailVerified,
            lastLogin: handleFormatDate(currUser?.metadata?.lastSignInTime, 2),
            fullName: dbUser?.fullName,
            username: dbUser?.displayName,
            role: dbUser?.role,
            phoneNumber: dbUser?.phoneNumber,
            avatar: dbUser?.avatar,
          };
          // Set user
          setUser(currUserObj);
        });
        // Debug
        // console.log("Debug authContextUser 1: ", currUser);
      } else {
        setUser(null);
        nookies.set(undefined, "ftoken", "", { path: "/" });
        //console.log("Debug authContextUser 2: ", currUser);
      } // close if
      // Set loading
      setLoading(false);
    });
    // Clean up
    return () => {
      unsubscribe();
    };
  }, []); // fireUserID

  // Return provider
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        handleRegister,
        handleLogin,
        handleLogout,
        handleEmailExist,
        handleUsernameExist,
        handleIsSuperAdmin,
        handleSendEmailVerifyLink,
        handleSendPassResetLink,
        handleVerifyEmail,
        handleResetPassword,
      }}
    >
      {/** If loading */}
      {loading ? null : <>{children}</>}
    </AuthContext.Provider>
  ); // close return
}; // close provider
