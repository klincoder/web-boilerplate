// Import resources
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { writeStorage } from "@rehooks/local-storage";

// Import custom files
import useAppSettings from "../hooks/useAppSettings";
import FormFeedback from "./FormFeedback";
import CustomTextInputForm from "./CustomTextInputForm";
import CustomPasswordForm from "./CustomPasswordForm";
import CustomButton from "./CustomButton";
import CustomSpinner from "./CustomSpinner";
import { useAuthContext } from "../context/AuthContext";
import { appRegex, apiRoutes, alertMsg } from "../config/data";
import { fireAuth, fireDB, setDoc, doc } from "../config/firebase";
import {
  handleTitleCase,
  handleSendEmail,
  handleGenUsername,
} from "../config/functions";

// Component
const FormRegister = () => {
  // Define auth context
  const { handleEmailExist, handleRegister } = useAuthContext();

  // Define state
  const [showPass, setShowPass] = useState(false);
  const [formMsg, setFormMsg] = useState(null);

  // Define app settings
  const { siteInfo, todaysDate, todaysDate1, router, alert } = useAppSettings();

  // Debug
  //console.log("Debug formRegister: ",)

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

  // FUNCTIONS
  // HANDLE SBUMIT FORM
  const handleSubmitForm = async (values, { setSubmitting, resetForm }) => {
    // Define variables
    const finalFullName = handleTitleCase(values.fullName?.trim());
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
      // Alert err
      alert.error("Email address already exist");
      return;
    } // close if

    // Try catch
    try {
      // Create user
      await handleRegister(finalUsername, finalEmail, finalPass);
      // Define variables
      const currUser = fireAuth.currentUser;
      const currUserID = currUser.uid;

      // Write tempEmail to local storage
      writeStorage("tempEmail", { email: finalEmail, username: finalUsername });

      // Add user to database
      const newUserRef = doc(fireDB, "users", currUserID);
      await setDoc(newUserRef, {
        regMethod: "website",
        avatar: "",
        role: "user",
        fullName: finalFullName,
        emailAddress: finalEmail,
        pushStatus: true,
        userID: currUserID,
        username: finalUsername,
        dateCreated: todaysDate,
        dateUpdated: todaysDate,
      });

      // Send admin new user email
      await handleSendEmail(
        "admin",
        siteInfo?.adminName,
        siteInfo?.adminEmail,
        emailMsg,
        apiRoutes?.newUser
      );

      // Reset form
      resetForm();
      setFormMsg({ type: "succ", msg: alertMsg?.linkSentSucc });
      router.push("#registerPage");
    } catch (err) {
      alert.error(err.message);
      setFormMsg({ type: "err", msg: err.message });
      //console.log("Debug regSubmitForm: ", err.message);
    } // close try catch
    // Set submitting
    setSubmitting(false);
  }; // close submit fxn

  // Return component
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={handleSubmitForm}
    >
      {({ values, errors, isValid, isSubmitting }) => (
        <Form autoComplete="">
          {/** Debug */}
          {/* {console.log("Debug formValues: ", values)} */}

          {/** Form feedback */}
          <FormFeedback data={formMsg} />

          {/** Full name */}
          <CustomTextInputForm name="fullName" label="Full Name" />

          {/** Email address */}
          <CustomTextInputForm
            type="email"
            name="emailAddr"
            label="Email Address"
            helperText="We'll send a verification code"
          />

          {/** Password */}
          <CustomPasswordForm
            name="pass"
            label="Password"
            showPass={showPass}
            onShowPass={() => setShowPass(!showPass)}
          />

          {/** Button */}
          <div className="text-center">
            <CustomButton
              isNormal
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Create Account {isSubmitting && <CustomSpinner />}
            </CustomButton>
          </div>

          {/** Accept terms */}
          <div className="text-xs text-center text-gray-500 my-2">
            By creating an account, you accept our{" "}
            <CustomButton isLink href="/terms">
              <a className="text-sm" target="_blank" rel="noreferrer">
                terms
              </a>
            </CustomButton>
          </div>

          {/** MORE LINKS */}
          {/** Login link */}
          <div className="text-center mt-1">
            <CustomButton isLink href="/login">
              <a className="text-sm">Have an account? Login</a>
            </CustomButton>
          </div>
        </Form>
      )}
    </Formik>
  ); // close return
}; // close component

// Export
export default FormRegister;
