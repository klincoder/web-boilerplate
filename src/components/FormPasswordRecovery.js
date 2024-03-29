// Import resources
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Import custom files
import twStyles from "../styles/twStyles";
import useAppSettings from "../hooks/useAppSettings";
import useAuthState from "../hooks/useAuthState";
import useAlertState from "../hooks/useAlertState";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import CustomSpinner from "./CustomSpinner";
import { alertMsg } from "../config/data";

// Component
const FormPasswordRecovery = () => {
  // Define app settings
  const { isMounted } = useAppSettings();

  // Define state
  const { handleUserExist, handleSendPasswordResetLink } = useAuthState();

  // Define alert
  const alert = useAlertState();

  // FORM CONFIG
  // Initial values
  const initialValues = {
    emailAddr: "",
  };

  // Validate
  const validate = Yup.object().shape({
    emailAddr: Yup.string().required("Required").email("Invalid email address"),
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

  // Debug
  //console.log("Debug formPassRecovery: ",)

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values) => {
    // Define variables
    const finalEmail = values?.emailAddr?.trim()?.toLowerCase();
    const userExist = handleUserExist(finalEmail);
    const userInfo = userExist?.data;
    const username = userInfo?.username;
    const userEmail = userInfo?.email_address;

    // If userExist
    if (!userExist?.isValid) {
      alert.error(alertMsg?.inValidCred);
      return;
    } // close if

    // Debug
    //console.log("Debug submitForm: ", userExist);

    // Try catch
    try {
      // Send password reset link
      await handleSendPasswordResetLink(username, userEmail);
      // Alert info
      alert.info(alertMsg?.linkSentSucc);
      reset();
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

      {/** Email address */}
      <CustomInput
        name="emailAddr"
        control={control}
        type="email"
        label="Email Address"
      />

      {/** Submit */}
      <CustomButton isNormal type="submit" disabled={!isValid || isSubmitting}>
        Send Reset Link {isSubmitting && <CustomSpinner />}
      </CustomButton>

      {/** MORE LINKS */}
      {/** Login */}
      <div className="text-center text-sm mt-4">
        <CustomButton isLink href="/login">
          Back to Login
        </CustomButton>
      </div>
    </form>
  ); // close return
}; // close component

// Export
export default FormPasswordRecovery;
