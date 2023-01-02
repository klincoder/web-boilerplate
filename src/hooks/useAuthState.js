// Import resources
import { useRecoilValue } from "recoil";
import { signOut } from "next-auth/react";

// Import custom files
import useAppSettings from "./useAppSettings";
import useAlertState from "./useAlertState";
import { allUsersAtom } from "../recoil/atoms";
import { handleSendEmail } from "../config/functions";
import { alertMsg, apiRoutes } from "../config/data";
import {
  applyActionCode,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  fireAuth,
  signOut as signOutToken,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
  verifyPasswordResetCode,
} from "../config/firebase";

// Component
const useAuthState = () => {
  // Define app settings
  const { router, todaysDate2 } = useAppSettings();

  // Define state
  const allUsers = useRecoilValue(allUsersAtom);

  // Define alert
  const alert = useAlertState();

  // FUNCTIONS
  // HANDLE USER EXIST
  const handleUserExist = (emailAddr) => {
    // If empty args, return
    if (!emailAddr) return;
    // Filter users
    const filterData = allUsers?.filter(
      (i) => i?.email_address === emailAddr || i?.username === emailAddr
    );
    const data = filterData?.[0];
    const valid = filterData?.length > 0;
    return { valid, data };
  }; // close fxn

  // HANDLE REGISTER
  const handleRegister = async (username, email, pass, actionSettings) => {
    // If empty arg, return
    if (!username || !email || !pass) return;
    return await createUserWithEmailAndPassword(fireAuth, email, pass).then(
      async (res) => {
        // Send verification link
        //await sendEmailVerification(res.user, actionSettings);
        await updateProfile(res?.user, { displayName: username });
      }
    ); // close return
  }; // close fxn

  // HANDLE LOGIN
  const handleLogin = async (email, pass) => {
    // If empty arg, return
    if (!email || !pass) return;
    return await signInWithEmailAndPassword(fireAuth, email, pass);
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
    );
    // return await signOut(fireAuth).then(() => {
    //   alert.success(alertMsg?.logoutSucc);
    //   router.replace("/");
    // }); // close return
  }; // close fxn

  // HANDLE SEND EMAIL VERIFY LINK
  const handleSendEmailVerifyLink = async (currUser, actionSettings) => {
    // If empty args, return
    if (!currUser) return;
    return await sendEmailVerification(currUser, actionSettings);
  }; // close fxn

  // HANDLE SEND PASSWORD RESET LINK
  const handleSendPassResetLink = async (
    currUser,
    emailAddr,
    actionSettings
  ) => {
    // If empty args, return
    if (!currUser || !emailAddr) return;
    return await sendPasswordResetEmail(currUser, emailAddr, actionSettings); // close return
  }; // close fxn

  // HANDLE VERIFY EMAIL
  const handleVerifyEmail = async (actionCode) => {
    // If empty args, return
    if (!actionCode) return;
    return await applyActionCode(fireAuth, actionCode);
  }; // close fxn

  // HANDLE RESET PASSWORD
  const handleResetPassword = async (actionCode, newPass, fromName) => {
    // If empty args, return
    if (!actionCode || !newPass || !fromName) return;
    // Verify the password reset code is valid
    return await verifyPasswordResetCode(fireAuth, actionCode).then(
      async (email) => {
        // Define variables
        const userExist = handleUserExist(email);
        const userInfo = userExist?.data;
        // Confirm new password (save to firebase auth)
        await confirmPasswordReset(fireAuth, actionCode, newPass).then(
          async () => {
            // Send pass change alert
            await handleSendEmail(
              "user",
              userInfo?.username,
              userInfo?.email,
              todaysDate2,
              apiRoutes?.passChange,
              fromName
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

  // HANDLE VERIFY WALLET TRANSACTION
  const handleVerifyWalletTranx = (user, amt) => {
    // If empty args, return
    if (typeof amt !== "number") return;
    const isValidAmt = user?.walletBal > amt ? true : false;
    const result = userInfo?.isPositiveWallet && isValidAmt ? true : false;
    return result;
  }; // close fxn

  // Return component
  return {
    handleUserExist,
    handleRegister,
    handleLogin,
    handleLogout,
    handleIsSuperAdmin,
    handleSendEmailVerifyLink,
    handleSendPassResetLink,
    handleVerifyEmail,
    handleResetPassword,
  }; // close return
}; // close component

// Export
export default useAuthState;
