// Import resources
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { useAlert } from "react-alert";

// Import custom files
import useAppSettings from "../hooks/useAppSettings";
import { handleFormatDate } from "../config/functions";
import { allUsersAtom } from "../recoil/atoms";
import { alertMsg, baseUrl } from "../config/data";
import {
  createUserWithEmailAndPassword,
  doc,
  fireAuth,
  fireDB,
  onAuthStateChanged,
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
  const { todaysDate1 } = useAppSettings();

  // Define router
  const router = useRouter();

  // Define alert
  const alert = useAlert();

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
        // Confirm new password (save to firebase auth)
        await confirmPasswordReset(fireAuth, actionCode, newPass);
      }
    );
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
    const unsubscribe = onAuthStateChanged(fireAuth, (currUser) => {
      // If currUser
      if (currUser?.emailVerified) {
        const userInfoRef = doc(fireDB, "users", currUser?.uid);
        onSnapshot(userInfoRef, (snapshot) => {
          // Define variables
          const dbUser = snapshot.data();
          const currUserObj = {
            id: currUser?.uid,
            email: currUser?.email,
            username: currUser?.displayName,
            emailVerified: currUser?.emailVerified,
            phoneNumber: currUser?.phoneNumber,
            avatar: currUser?.photoURL,
            lastLogin: handleFormatDate(currUser?.metadata?.lastSignInTime, 2),
            fullName: dbUser?.fullName,
            role: dbUser?.role,
          };
          // Set user
          setUser(currUserObj);
        });
        // Debug
        // console.log("Debug authContextUser 1: ", currUser);
      } else {
        setUser(null);
        // Debug
        //console.log("Debug authContextUser 2: ", currUser);
      } // close if
      // Set loading
      setLoading(false);
    });
    // Clean up
    return unsubscribe();
  }, [fireUserID]);

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

// Export
//export default AuthContext
