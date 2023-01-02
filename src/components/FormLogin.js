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
import { fireAuth, signInWithCustomToken } from "../config/firebase";
import { handleFireAdminAction } from "../config/functions";

// Component
const FormLogin = ({ csrfToken, siteInfo }) => {
  // Define app settings
  const { todaysDate1, router, routeQuery, isRouteQuery } = useAppSettings();

  // Define state
  const { handleUserExist, handleLogin } = useAuthState();
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
    const userExist = handleUserExist(finalEmail);

    // If !userExist
    if (!userExist?.valid) {
      alert.error(alertMsg?.loginErr);
      return;
    } // close if

    // Debug
    // console.log("Debug submitForm: ", values);

    // Try catch
    try {
      // Verify and login user
      const res = await signIn("credentials", {
        redirect: false,
        email: finalEmail,
        password: finalPass,
        callbackUrl: `${destUrl}`,
      });

      // If res err
      if (res?.error) {
        alert.error(alertMsg?.loginErr);
      } else {
        // Login into firebase with custom token
        const token = await handleFireAdminAction(finalEmail, "custom-token");
        await signInWithCustomToken(fireAuth, token);
        //await handleFireAdminAction(finalEmail, "custom-token-login");

        // Send user email
        // await handleLoginEmail(
        //   userInfo?.username,
        //   userInfo?.emailAddress,
        //   moment().format("MMM, D, YYYY [at] h:mm A")
        // );

        // Alert succ
        alert.success(alertMsg?.loginSucc);
        router.push(res?.url);
      } // close if res error
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
