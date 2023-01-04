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
import { doc, fireAuth, fireDB, setDoc } from "../config/firebase";
import { handleHashVal } from "../config/functions";

// Component
const FormRegister = () => {
  // Define app settings
  const { todaysDate, siteInfo } = useAppSettings();

  // Define state
  const { handleUserExist, handleRegister } = useAuthState();
  const [showPass, setShowPass] = useState(false);

  // Define alert
  const alert = useAlertState();

  // FORM CONFIG
  // Initial values
  const initialValues = {
    username: "",
    emailAddr: "",
    pass: "",
  };

  // Validate
  const validate = Yup.object().shape({
    username: Yup.string().required("Required").min(2, "Too short"),
    emailAddr: Yup.string().required("Required").email("Invalid email address"),
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

  // Debug
  //console.log("Debug formRegister: ", formVal?.otpInput);

  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values) => {
    // Define variables
    const finalUsername = values?.username?.trim()?.toLowerCase();
    const finalEmail = values?.emailAddr?.trim()?.toLowerCase();
    const finalPass = values?.pass?.trim();
    const passHash = handleHashVal(finalPass);
    const userExist = handleUserExist(finalEmail);

    // If userExist
    if (userExist?.isValid) {
      alert.error(alertMsg?.inValidCred);
      return;
    } // close if

    // Try catch
    try {
      // Register user
      await handleRegister(finalUsername, finalEmail, finalPass);

      // Define variables
      const currUser = fireAuth.currentUser;
      const currUserID = currUser?.uid;
      const userEmailMsg = {
        role: "user",
        toName: finalUsername,
        toEmail: finalEmail,
      };
      const adminEmailMsg = {
        role: "admin",
        toName: siteInfo?.adminName,
        toEmail: siteInfo?.adminEmail,
      };

      // Add user to db
      const newUserRef = doc(fireDB, "users", currUserID);
      await setDoc(newUserRef, {
        reg_method: "website",
        avatar: "",
        role: "user",
        full_name: "",
        email_address: finalEmail,
        password: passHash,
        push_status: { app: true, email: true, sms: true },
        user_id: currUserID,
        username: finalUsername,
        date_created: todaysDate,
        date_updated: todaysDate,
      });

      // Send email
      // await handleSendEmail(userEmailMsg, apiRoutes?.welcome);
      // await handleSendEmail(adminEmailMsg, apiRoutes?.newUser);

      // Alert info
      alert.info(alertMsg?.linkSentSucc);
      reset();
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

      {/** Username */}
      <CustomInput name="username" control={control} label="Username" />

      {/** Email address */}
      <CustomInput
        name="emailAddr"
        control={control}
        type="email"
        label="Email Address"
        //helperText="We'll send your verification link"
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
        Register {isSubmitting && <CustomSpinner />}
      </CustomButton>

      {/** Accept terms */}
      <div className="text-sm text-center text-gray-500 mt-2">
        I have read and accepted the{" "}
        <CustomButton isLink href="/terms" target="_blank" rel="noreferrer">
          terms
        </CustomButton>
        .
      </div>

      {/** MORE LINKS */}
      {/** Login */}
      <div className="text-center text-sm mt-4">
        <CustomButton isLink href="/login">
          Have an account? Login
        </CustomButton>
      </div>
    </form>
  ); // close return
}; // close component

// Export
export default FormRegister;
