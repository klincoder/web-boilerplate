// Import resources
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";
import useAppSettings from "../hooks/useAppSettings";
import CustomTextInputForm from "./CustomTextInputForm";
import CustomPasswordForm from "./CustomPasswordForm";
import CustomSpinner from "./CustomSpinner";
import FormFeedback from "./FormFeedback";
import { useAuthContext } from "../context/AuthContext";
import { alertMsg, apiRoutes } from "../config/data";
import { handleSendEmail } from "../config/functions";
import { fireAuth } from "../config/firebase";

// Component
const FormLogin = () => {
  // Define auth context
  const { handleLogin, handleSendEmailVerifyLink } = useAuthContext();

  // Define state
  const [showPass, setShowPass] = useState(false);
  const [formMsg, setFormMsg] = useState(null);

  // Define app settings
  const { todaysDate1, router, alert, routeHasQuery } = useAppSettings();

  // Define destUrl
  const destUrl = routeHasQuery ? router.query.callbackUrl : "/cms";

  // Debug
  //console.log("Debug formLogin: ",);

  // FORM CONFIG
  // Initial values
  const initialValues = {
    emailAddr: "",
    pass: "",
  };

  // Validate
  const validate = Yup.object({
    emailAddr: Yup.string()
      .required("Required")
      .email("Invalid email address")
      .max(50, "Too long"),
    pass: Yup.string().required("Required").min(8, "Too short"),
    // checkbox: Yup.array().min(1, "Select one or more"),
    // radio: Yup.string().required("Required"),
    // switch: Yup.array().min(1, "Select one or more"),
  });

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values, { setSubmitting }) => {
    // Define variables
    const finalEmail = values.emailAddr?.trim()?.toLowerCase();
    const finalPass = values.pass?.trim();

    // Debug
    //console.log("Debug submitForm: ",);

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
          apiRoutes?.login
        );
        // Alert succ
        alert.success(alertMsg?.loginSucc);
        router.push(destUrl);
      } else {
        // Send email verify link
        await handleSendEmailVerifyLink(currUser);
        setFormMsg({
          type: "warning",
          msg: `Unverified email. ${alertMsg?.linkSentSucc}`,
        });
      } // close if
    } catch (err) {
      setFormMsg({ type: "err", msg: err.message });
      //console.log("Debug submitForm: ", err.message);
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
          {/* {console.log("Debug formValues:",)} */}

          {/** Form feedback */}
          <FormFeedback data={formMsg} />

          {/** Email addr */}
          <CustomTextInputForm
            isRequired
            name="emailAddr"
            label="Email Address"
          />

          {/** Pass */}
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
              Login {isSubmitting && <CustomSpinner />}
            </CustomButton>
          </div>

          {/** MORE LINKS */}
          <div>
            <div className="flex flex-wrap mt-3">
              {/** Forgot password */}
              <div className="w-1/2">
                <CustomButton isLink href="/password-recovery">
                  <a className="text-sm">Forgot password?</a>
                </CustomButton>
              </div>
              {/** Register */}
              <div className="w-1/2 text-right">
                <CustomButton isLink href="/register">
                  <a className="text-sm">Create account</a>
                </CustomButton>
              </div>
            </div>

            {/** Or */}
            {/* <div>Or</div> */}
          </div>
        </Form>
      )}
    </Formik>
  ); // close return
}; // close component

// Export
export default FormLogin;
