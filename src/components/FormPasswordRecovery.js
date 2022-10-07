// Import resources
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Import custom files
import CustomSpinner from "./CustomSpinner";
import useAppSettings from "../hooks/useAppSettings";
import CustomTextInputForm from "./CustomTextInputForm";
import CustomButton from "./CustomButton";
import FormFeedback from "./FormFeedback";
import { useAuthContext } from "../context/AuthContext";
import { fireAuth } from "../config/firebase";
import { alertMsg } from "../config/data";

// Component
const FormPasswordRecovery = () => {
  // Define auth context
  const { handleEmailExist, handleSendPassResetLink } = useAuthContext();

  // Define state
  const [formMsg, setFormMsg] = useState(null);

  // Define app settings
  const { alert } = useAppSettings();

  // Debug
  //console.log("Debug formPassRecovery: ",);

  // FORM CONFIG
  // Initial values
  const initialValues = {
    emailAddr: "",
  };

  // Validate
  const validate = Yup.object().shape({
    emailAddr: Yup.string().required("Required").email("Invalid email address"),
  });

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values, { setSubmitting, resetForm }) => {
    // Define variables
    const finalEmail = values.emailAddr?.trim()?.toLowerCase();
    const emailExist = handleEmailExist(finalEmail);

    // If !emailExist
    if (!emailExist?.isValid) {
      alert.error("User not found");
      return;
    } // close if

    // Debug
    // console.log("Debug submitForm: ", values);

    // Try catch
    try {
      // Send password reset link
      await handleSendPassResetLink(fireAuth, finalEmail);
      // Reset form
      resetForm();
      setFormMsg({ type: "succ", msg: alertMsg?.linkSentSucc });
    } catch (err) {
      setFormMsg({ type: "err", msg: err.message });
      //console.log("Debug submitForm: ", err.message);
    } // close try catch
    // Set submitting
    setSubmitting(false);
  }; // close submit form

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
          {/* {console.log("Debug formValues: ", values.isNewPass)} */}

          {/** Form feedback */}
          <FormFeedback data={formMsg} />

          {/** Email address */}
          <CustomTextInputForm
            isRequired
            type="email"
            name="emailAddr"
            label="Email Address"
            helperText="We'll send your verification link"
          />

          {/** Button */}
          <CustomButton
            isNormal
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            Send recovery link
            {isSubmitting && <CustomSpinner />}
          </CustomButton>

          {/** OTHER LINKS */}
          {/** Login link */}
          <div className="text-center mt-3">
            <CustomButton isLink href="/login">
              <a className="text-base">Back to Login</a>
            </CustomButton>
          </div>
        </Form>
      )}
    </Formik>
  ); // close return
}; // close component

// Export
export default FormPasswordRecovery;
