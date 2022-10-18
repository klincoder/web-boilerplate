// Import resources
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Import custom files
import useAppSettings from "../hooks/useAppSettings";
import CustomTextInputForm from "./CustomTextInputForm";
import CustomPasswordForm from "./CustomPasswordForm";
import CustomButton from "./CustomButton";
import CustomSpinner from "./CustomSpinner";
import FormFeedback from "./FormFeedback";
import { useAuthContext } from "../context/AuthContext";
import { handleSendEmail, handleGenUsername } from "../config/functions";
import { apiRoutes, alertMsg } from "../config/data";
import { fireAuth, fireDB, setDoc, doc } from "../config/firebase";

// Component
const FormRegister = () => {
  // Define auth context
  const { handleEmailExist, handleRegister } = useAuthContext();

  // Define state
  const [showPass, setShowPass] = useState(false);
  const [formMsg, setFormMsg] = useState(null);

  // Define app settings
  const { siteInfo, todaysDate, todaysDate1, alert } = useAppSettings();

  // Debug
  //console.log("Debug formRegister: ",)

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

  // FUNCTIONS
  // HANDLE SBUMIT FORM
  const handleSubmitForm = async (values, { setSubmitting, resetForm }) => {
    // Define variables
    const finalEmail = values.emailAddr?.trim()?.toLowerCase();
    const finalPass = values.pass?.trim();
    const finalUsername = handleGenUsername(finalEmail);
    const emailMsg = {
      username: finalUsername,
      email: finalEmail,
      date: todaysDate1,
    };

    // Define email exist
    const emailExist = handleEmailExist(finalEmail);

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

      // Add user to database
      const newUserRef = doc(fireDB, "users", currUserID);
      await setDoc(newUserRef, {
        regMethod: "website",
        avatar: "",
        role: "user",
        fullName: "",
        phoneNumber: "",
        pushStatus: true,
        userID: currUserID,
        username: finalUsername,
        emailAddress: finalEmail,
        dateCreated: todaysDate,
        dateUpdated: todaysDate,
      });

      // Send user welcome email
      // await handleSendEmail(
      //   "user",
      //   finalUsername,
      //   finalEmail,
      //   emailMsg,
      //   apiRoutes?.welcome
      // );

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
    } catch (err) {
      // Alert err
      alert.error(alertMsg?.general);
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

          {/** Email address */}
          <CustomTextInputForm
            isRequired
            type="email"
            name="emailAddr"
            label="Email Address"
            helperText="We'll send a verification link"
          />

          {/** Password */}
          <CustomPasswordForm
            isRequired
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
