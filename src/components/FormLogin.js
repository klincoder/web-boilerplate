// Import resources
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Import custom files
import twStyles from "../styles/twStyles";
import useAppSettings from "../hooks/useAppSettings";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import CustomSpinner from "./CustomSpinner";
import useAuthState from "../hooks/useAuthState";
import useAlertState from "../hooks/useAlertState";
import { alertMsg, apiRoutes } from "../config/data";
import { fireAuth } from "../config/firebase";
import { handleCompareHashVal } from "../config/functions";

// Component
const FormLogin = ({ csrfToken }) => {
  // Define app settings
  const { siteInfo, todaysDate1, router, routeQuery } = useAppSettings();

  // Define state
  const [showPass, setShowPass] = useState(false);
  const { handleUserExist, handleLogin, handleSendVerifyEmailLink } =
    useAuthState();

  // Define alert
  const alert = useAlertState();

  // FORM CONFIG
  // Initial values
  const initialValues = {
    emailAddr: "",
    pass: "",
  };

  // Validate
  const validate = Yup.object().shape({
    emailAddr: Yup.string()
      .required("Required")
      .email("Invaid email address")
      .max(150, "too long"),
    pass: Yup.string().required("Required").min(8, "Too short"),
  });

  // Form state
  const {
    control,
    formState: { isValid, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    mode: "all",
    defaultValues: initialValues,
    resolver: yupResolver(validate),
  }); // close form state

  // Define variables
  const destUrl = routeQuery?.callbackUrl || "/cms";

  // Debug
  //console.log("Debug formLogin: ",)

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values) => {
    // Define variables
    const finalEmail = values.emailAddr?.trim()?.toLowerCase();
    const finalPass = values.pass?.trim();
    const userExist = handleUserExist(finalEmail);
    const userInfo = userExist?.data;
    const username = userInfo?.username;
    const userEmail = userInfo?.email_address;
    const isValidPass = handleCompareHashVal(finalPass, userInfo?.password);

    // If !userExist
    if (!userExist?.isValid) {
      alert.error(alertMsg?.inValidCred);
      return;
    } else if (!isValidPass) {
      alert.error(alertMsg?.inValidCred);
      return;
    } // close if

    // Debug
    // console.log("Debug submitForm: ", values);

    // Try catch
    try {
      // Login to fireAuth and check if email verified
      await handleLogin(finalEmail, finalPass);
      const currUser = fireAuth.currentUser;

      // If userEmailVerified
      if (currUser?.emailVerified) {
        // Login user with next auth
        const res = await signIn("credentials", {
          redirect: false,
          email: finalEmail,
          password: finalPass,
          callbackUrl: `${destUrl}`,
        });

        // If res err
        if (res?.error) {
          alert.error(alertMsg?.inValidCred);
        } else {
          // Login into firebase auth with custom token
          await handleLogin(finalEmail, finalPass);
          // Send email
          const userEmailMsg = { toName: username, toEmail: userEmail };
          //await handleLoginEmail(userEmailMsg, apiRoutes?.login);
          // Alert succ
          reset();
          alert.success(alertMsg?.loginSucc);
          router.push(res?.url);
        } // close if res error
      } else {
        // Resend email verification link
        await handleSendVerifyEmailLink(username, userEmail);
        alert.info(alertMsg?.linkSentSucc);
        reset();
      } // close if
    } catch (err) {
      alert.error(alertMsg?.generalErr);
      //console.log("Debug submitForm: ", err.message);
    } // close try catch
  }; // close fxn

  // Return component
  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      {/** Debug */}
      {/* {console.log("Debug formValues: ",)} */}

      {/** CsrfToken */}
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

      {/** Email address */}
      <CustomInput name="emailAddr" control={control} label="Email Address" />

      {/** Pass */}
      <CustomInput
        name="pass"
        control={control}
        type="password"
        label="Password"
        showPass={showPass}
        onShowPass={() => setShowPass(!showPass)}
      />

      {/** Submit */}
      <CustomButton isNormal type="submit" disabled={!isValid || isSubmitting}>
        Submit {isSubmitting && <CustomSpinner />}
      </CustomButton>

      {/** MORE LINKS */}
      <div className="flex flex-col items-center justify-center text-sm mt-4 space-y-2 md:flex-row md:justify-between md:space-y-0">
        {/** Forgot password */}
        <CustomButton isLink href="/password-recovery">
          Forgot password?
        </CustomButton>
        {/** Register */}
        <CustomButton isLink href="/register">
          Register
        </CustomButton>
      </div>
    </form>
  ); // close return
}; // close component

// Export
export default FormLogin;
