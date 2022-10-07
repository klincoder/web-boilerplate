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
import { handleTitleCase, handleSendEmail } from "../config/functions";
import { appRegex, apiRoutes, alertMsg } from "../config/data";
import { fireAuth, fireDB, setDoc, doc } from "../config/firebase";

// Component
const FormRegister = () => {
  // Define auth context
  const { handleEmailExist, handleUsernameExist, handleRegister } =
    useAuthContext();

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
    fullName: "",
    username: "",
    emailAddr: "",
    phoneNum: "",
    pass: "",
    repeatPass: "",
  };

  // Validate
  const validate = Yup.object().shape({
    fullName: Yup.string().required("Required").min(3, "Too short"),
    username: Yup.string()
      .required("Required")
      .min(6, "Too short")
      .max(20, "Too long"),
    emailAddr: Yup.string().required("Required").email("Invalid email address"),
    phoneNum: Yup.string()
      .matches(appRegex?.digitsOnly, "Digits only")
      .min(10, "Too short")
      .max(10, "Too long"),
    pass: Yup.string().required("Required").min(8, "Too short"),
    repeatPass: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("pass"), null], "Password must match"),
  });

  // FUNCTIONS
  // HANDLE SBUMIT FORM
  const handleSubmitForm = async (values, { setSubmitting, resetForm }) => {
    // Define variables
    const finalFullName = handleTitleCase(values.fullName?.trim());
    const finalUsername = values.username?.trim()?.toLowerCase();
    const finalEmail = values.emailAddr?.trim()?.toLowerCase();
    const finalPhoneNum = values.phoneNum?.trim();
    const finalPass = values.pass?.trim();
    const emailMsg = {
      username: finalUsername,
      email: finalEmail,
      date: todaysDate1,
    };

    // Define email and user exist
    const emailExist = handleEmailExist(finalEmail);
    const usernameExist = handleUsernameExist(finalUsername);

    // If emailExist
    if (emailExist?.isValid) {
      // Alert err
      alert.error("Email address already exist");
      return;
    } else if (usernameExist?.isValid) {
      // Alert err
      alert.error("Username is unavailable");
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
        userID: currUserID,
        role: "user",
        avatar: "",
        fullName: finalFullName,
        username: finalUsername,
        emailAddress: finalEmail,
        phoneNumber: finalPhoneNum,
        pushStatus: true,
        dateCreated: todaysDate,
        dateUpdated: todaysDate,
      });

      // Send user welcome email
      await handleSendEmail(
        "user",
        finalUsername,
        finalEmail,
        emailMsg,
        apiRoutes?.welcome
      );

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
          <CustomTextInputForm isRequired name="fullName" label="Full Name" />

          {/** Username */}
          <CustomTextInputForm isRequired label="Username" name="username" />

          {/** Email address */}
          <CustomTextInputForm
            isRequired
            type="email"
            name="emailAddr"
            label="Email Address"
            helperText="We'll send a verification link"
          />

          {/** Phone number */}
          <CustomTextInputForm name="phoneNum" label="Phone Number" />

          {/** Password */}
          <div className="flex flex-col md:flex-row md:gap-2">
            <div className="w-full md:w-1/2">
              <CustomPasswordForm
                isRequired
                name="pass"
                label="Password"
                showPass={showPass}
                onShowPass={() => setShowPass(!showPass)}
              />
            </div>

            {/** Repeat Password */}
            <div className="w-full md:w-1/2">
              <CustomPasswordForm
                isRequired
                name="repeatPass"
                label="Repeat Password"
                showPass={showPass}
                onShowPass={() => setShowPass(!showPass)}
              />
            </div>
          </div>

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
