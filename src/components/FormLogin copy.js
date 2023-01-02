// Import resources
import React, { useState } from "react";
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

// Component
const FormLogin = ({ siteInfo }) => {
  // Define app settings
  const { todaysDate1, router, routeQuery } = useAppSettings();

  // Define state
  const { handleEmailExist, handleLogin } = useAuthState();
  const [showPass, setShowPass] = useState(false);

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
    emailAddr: Yup.string().required("Required").email("Invalid email address"),
    pass: Yup.string().required("Required").min(8, "Too short"),
  });

  // Form state
  const {
    control,
    formState: { isValid, isSubmitting },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    mode: "all",
    defaultValues: initialValues,
    resolver: yupResolver(validate),
  }); // close form state

  // Define variables
  const formVal = watch();
  const destUrl = routeQuery?.callbackUrl || "/cms";

  // Debug
  //console.log("Debug formLogin: ",)

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values) => {
    // Define variables
    const finalEmail = values.emailAddr?.trim()?.toLowerCase();
    const finalPass = values.pass?.trim();
    const emailExist = handleEmailExist(finalEmail);

    console.log("Debug submitForm: ", emailExist?.isValid);

    // If !emailExist
    if (!emailExist?.isValid) {
      alert.error(alertMsg?.emailExistErr);
      return;
    } // close if

    // Debug
    // console.log("Debug submitForm: ", values);

    // Try catch
    try {
      // Login user
      await handleLogin(finalEmail, finalPass);
      // Define variables
      const currUser = fireAuth.currentUser;
      const isEmailVerified = currUser.emailVerified === true;

      // If isEmailVerified
      if (isEmailVerified) {
        // Send login alert
        await handleSendEmail(
          "user",
          currUser?.displayName,
          currUser?.email,
          todaysDate1,
          apiRoutes?.login,
          siteInfo?.name
        );
        // Alert succ
        alert.success(alertMsg?.loginSucc);
        router.push(destUrl);
      } else {
        // Send email verify link
        await handleSendEmailVerifyLink(currUser);
        alert.info(alertMsg?.linkSentSucc);
        reset();
      } // close if
    } catch (err) {
      alert.error(alertMsg?.loginErr);
      //console.log("Debug submitForm: ", err.message);
    } // close try catch
  }; // close fxn

  // Return component
  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      {/** Debug */}
      {/* {console.log("Debug formValues: ",)} */}

      {/** Email address */}
      <CustomInput
        name="emailAddr"
        control={control}
        type="email"
        label="Email Address"
      />

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
