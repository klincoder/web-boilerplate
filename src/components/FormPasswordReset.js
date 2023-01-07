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
import { alertMsg } from "../config/data";

// Component
const FormPasswordReset = ({ actionCode }) => {
  // Define app settings
  const { router } = useAppSettings();

  // Define state
  const { handlePasswordReset } = useAuthState();
  const [showPass, setShowPass] = useState(false);

  // Define alert
  const alert = useAlertState();

  // FORM CONFIG
  // Initial values
  const initialValues = {
    newPass: "",
    repeatNewpass: "",
  };

  // Validate
  const validate = Yup.object().shape({
    newPass: Yup.string().required("Required").min(8, "Too short"),
    repeatNewPass: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("newPass"), null], "Password must match"),
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
  //console.log("Debug formPassReset: ",);

  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values) => {
    // Define variables
    const finalNewPass = values?.newPass?.trim();

    // Debug
    //console.log("Debug submitForm: ",);

    // Try catch
    try {
      // Register user
      await handlePasswordReset(actionCode, finalNewPass);

      // Alert succ
      alert.success(alertMsg?.passResetSucc);
      reset();
      router.replace("/login");
      //console.log("Debug submitForm: ", emailMsg);
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

      {/** New pass */}
      <CustomInput
        name="newPass"
        control={control}
        type="password"
        label="New Password"
        showPass={showPass}
        onShowPass={() => setShowPass(!showPass)}
      />

      {/** Repeat new pass */}
      <CustomInput
        name="repeatNewPass"
        control={control}
        type="password"
        label="Repeat Password"
        showPass={showPass}
        onShowPass={() => setShowPass(!showPass)}
      />

      {/** Submit */}
      <CustomButton isNormal type="submit" disabled={!isValid || isSubmitting}>
        Reset Password {isSubmitting && <CustomSpinner />}
      </CustomButton>
    </form>
  ); // close return
}; // close component

// Export
export default FormPasswordReset;
