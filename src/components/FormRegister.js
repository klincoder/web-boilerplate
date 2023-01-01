// Import resources
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { writeStorage } from "@rehooks/local-storage";

// Import custom files
import twStyles from "../styles/twStyles";
import useAppSettings from "../hooks/useAppSettings";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import CustomSpinner from "./CustomSpinner";
import useAuthState from "../hooks/useAuthState";
import { alertMsg, apiRoutes } from "../config/data";
import { doc, fireAuth, fireDB, setDoc } from "../config/firebase";
import {
  handleGenUsername,
  handleSendEmail,
  handleTitleCase,
} from "../config/functions";

// Component
const FormRegister = ({ siteInfo }) => {
  // Define app settings
  const { todaysDate, todaysDate1, router, alert } = useAppSettings();

  // Define state
  const { handleEmailExist, handleRegister } = useAuthState();
  const [showPass, setShowPass] = useState(false);

  // FORM CONFIG
  // Initial values
  const initialValues = {
    fullName: "",
    emailAddr: "",
    pass: "",
  };

  // Validate
  const validate = Yup.object().shape({
    fullName: Yup.string().required("Required").min(3, "Too short"),
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
  //console.log("Debug formRegister: ",)

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values) => {
    // Define variables
    const finalFullName = handleTitleCase(values?.fullName?.trim());
    const finalEmail = values.emailAddr?.trim()?.toLowerCase();
    const finalPass = values.pass?.trim();
    const finalUsername = handleGenUsername(finalEmail);
    const emailExist = handleEmailExist(finalEmail);
    const emailMsg = {
      username: finalUsername,
      email: finalEmail,
      date: todaysDate1,
    };

    // If emailExist
    if (emailExist?.isValid) {
      alert.error(alertMsg?.emailExistErr);
      return;
    } // close if

    // Debug
    //console.log("Debug submitForm: ", values);

    // Try catch
    try {
      // Register user
      await handleRegister(finalUsername, finalEmail, finalPass);
      // Define variables
      const currUser = fireAuth.currentUser;
      const currUserID = currUser.uid;

      // Create tempData in local storage
      writeStorage("tempData", {
        email: finalEmail,
        username: finalUsername,
        //fromName: siteInfo?.name,
      });

      // Add user to db
      // const newUserRef = doc(fireDB, "users", currUserID);
      // await setDoc(newUserRef, {
      //   reg_method: "website",
      //   avatar: "",
      //   role: "user",
      //   full_name: finalFullName,
      //   email_address: finalEmail,
      //   push_status: { app: true, email: true, sms: true },
      //   userID: currUserID,
      //   username: finalUsername,
      //   dateCreated: todaysDate,
      //   dateUpdated: todaysDate,
      // });

      // // Send admin email
      // await handleSendEmail(
      //   "admin",
      //   siteInfo?.adminName,
      //   siteInfo?.adminEmail,
      //   emailMsg,
      //   apiRoutes?.newUser,
      //   siteInfo?.name
      // );

      // Alert succ
      alert.success(alertMsg?.linkSentSucc);
      reset();
    } catch (err) {
      alert.error(alertMsg?.generalErr);
      console.log("Debug submitForm: ", err.message);
    } // close try catch
  }; // close fxn

  // Return component
  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      {/** Debug */}
      {/* {console.log("Debug formValues: ",)} */}

      {/** Full name */}
      <CustomInput name="fullName" control={control} label="Full Name" />

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

      {/** Accept terms */}
      <div className="text-sm text-center text-gray-500 my-2">
        By creating an account, you accept our{" "}
        <CustomButton isLink href="/terms" target="_blank" rel="noreferrer">
          terms
        </CustomButton>
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
