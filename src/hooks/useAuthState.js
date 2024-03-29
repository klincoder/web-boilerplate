// Import resources
import { useRecoilValue } from "recoil";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

// Import custom files
import useAppSettings from "./useAppSettings";
import useAlertState from "./useAlertState";
import { allUsersAtom } from "../recoil/atoms";
import { alertMsg, apiRoutes, appImages } from "../config/data";
import {
  handleFireAdminAction,
  handleHashVal,
  handleSendEmail,
  handleSliceString,
} from "../config/functions";
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  fireAuth,
  updateProfile,
  verifyPasswordResetCode,
  signInWithCustomToken,
  signOut as signOutToken,
  fireDB,
  setDoc,
  doc,
} from "../config/firebase";

// Component
const useAuthState = () => {
  // Define app settings
  const { router, todaysDate } = useAppSettings();

  // Define state
  const allUsers = useRecoilValue(allUsersAtom);

  // Define alert
  const alert = useAlertState();

  // Define session
  const session = useSession();

  // Define variables
  const currSession = session?.data?.user;
  const userID = currSession?.id;
  const user = {
    id: currSession?.id,
    name: currSession?.fullName,
    username: currSession?.username,
    email: currSession?.email,
    phone: currSession?.phone,
    avatar: currSession?.avatar || appImages?.avatar,
    pushStatus: currSession?.pushStatus,
    usernameFormat: handleSliceString(currSession?.username, 0, 12),
    sessionStatu: session?.status,
    sessionExpiry: session?.expiry,
  };

  // FUNCTIONS
  // HANDLE USER EXIST
  const handleUserExist = (val) => {
    // If empty args, return
    if (!val) return;
    // Filter users
    const filterData = allUsers?.filter(
      (i) => i?.email_address === val || i?.username === val
    );
    const isValid = filterData?.length > 0;
    const data = filterData?.[0];
    return { isValid, data };
  }; // close fxn

  // HANDLE SEND VERIFY EMAIL LINK
  const handleSendVerifyEmailLink = async (username, email) => {
    // If empty arg, return
    if (!username || !email) return;
    const verifyLink = await handleFireAdminAction(email, "verify-email");
    const emailMsg = { toName: username, toEmail: email, link: verifyLink };
    return await handleSendEmail(emailMsg, apiRoutes?.verifyEmail);
  }; // close fxn

  // HANDLE SEND PASSWORD RESET LINK
  const handleSendPasswordResetLink = async (username, email) => {
    // If empty args, return
    if (!username || !email) return;
    // Send password reset email
    const verifyLink = await handleFireAdminAction(email, "pass-reset");
    const emailMsg = { toName: username, toEmail: email, link: verifyLink };
    return await handleSendEmail(emailMsg, apiRoutes?.passRecovery);
  }; // close fxn

  // HANDLE LOGIN
  const handleLogin = async (email, pass) => {
    // If empty arg, return
    if (!email || !pass) return;
    // Login into firebase auth with custom token
    const token = await handleFireAdminAction(email, "custom-token");
    return await signInWithCustomToken(fireAuth, token);
  }; // close fxn

  // HANDLE REGISTER
  const handleRegister = async (username, email, pass) => {
    // If empty arg, return
    if (!username || !email || !pass) return;
    return await createUserWithEmailAndPassword(fireAuth, email, pass).then(
      async (res) => {
        // Send verify pass email
        await handleSendVerifyEmailLink(username, email);
        await updateProfile(res?.user, { displayName: username });
      }
    ); // close return
  }; // close fxn

  // HANDLE PASSWORD RESET
  const handlePasswordReset = async (actionCode, newPass) => {
    // If empty args, return
    if (!actionCode || !newPass) return;
    // Hash new pass
    const newPassHash = await handleHashVal(newPass, "hash");
    // Verify the password reset code is valid
    return await verifyPasswordResetCode(fireAuth, actionCode).then(
      async (email) => {
        // Define variables
        const userExist = handleUserExist(email);
        const userInfo = userExist?.data;
        const userID = userInfo?.user_id;
        const username = userInfo?.username;
        const userEmail = userInfo?.email_address;
        // Confirm new password and update db
        await confirmPasswordReset(fireAuth, actionCode, newPass).then(
          async () => {
            // Login with token
            await handleLogin(userEmail, newPass);
            // Update user db password
            const editUserRef = doc(fireDB, "users", userID);
            await setDoc(
              editUserRef,
              {
                password: newPassHash,
                date_updated: todaysDate,
              },
              { merge: true }
            );
            // Send email
            const emailMsg = { toName: username, toEmail: userEmail };
            await handleSendEmail(emailMsg, apiRoutes?.profileChange);
            await signOutToken(fireAuth);
          }
        ); // close confirmPasswordReset
      } // close verifyPasswordResetCode
    ); // close return
  }; // close fxn

  // HANDLE LOGOUT
  const handleLogout = async () => {
    // Return await response
    return await signOut({ redirect: false, callbackUrl: "/" }).then(
      async (res) => {
        await signOutToken(fireAuth);
        alert.success(alertMsg?.logoutSucc);
        router.replace(res?.url);
      }
    ); // close return
  }; // close fxn

  // Return component
  return {
    user,
    userID,
    handleUserExist,
    handleSendVerifyEmailLink,
    handleSendPasswordResetLink,
    handleLogin,
    handleRegister,
    handlePasswordReset,
    handleLogout,
  }; // close return
}; // close component

// Export
export default useAuthState;
