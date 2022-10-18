// Import resources
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Import custom files
import CustomSpinner from "./CustomSpinner";
import useAppSettings from "../hooks/useAppSettings";
import CustomPasswordForm from "./CustomPasswordForm";
import CustomButton from "./CustomButton";
import FormFeedback from "./FormFeedback";
import { useAuthContext } from "../context/AuthContext";

// Component
const FormResetPassword = ({ actionCode }) => {
  // Define auth context
  const { handleResetPassword } = useAuthContext();

  // Define state
  const [showPass, setShowPass] = useState(false);
  const [formMsg, setFormMsg] = useState(null);

  // Define app settings
  const { alert, router } = useAppSettings();

  // Debug
  //console.log("Debug formResetPass: ", userInfo);

  // FORM CONFIG
  // Initial values
  const initialValues = {
    newPass: "",
    repeatNewPass: "",
  };

  // Validate
  const validate = Yup.object().shape({
    newPass: Yup.string().required("Required").min(8, "Too short"),
    repeatNewPass: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("newPass"), null], "Password must match"),
  });

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values, { setSubmitting }) => {
    // Define variables
    const finalNewPass = values.newPass?.trim();

    // Debug
    //console.log("Debug submitForm: ", actionCode);

    // Try catch
    try {
      // Create user
      await handleResetPassword(actionCode, finalNewPass);
      // Login user
      //await handleLogin(email, newPass);
      // Alert succ
      alert.success("Password reset successful");
      router.push("/login");
    } catch (err) {
      setFormMsg({ type: "err", msg: err.message });
      //console.log("Debug submitForm: ", err.message);
    } // close try catch
    // Set submiting
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

          {/** New password */}
          <CustomPasswordForm
            isRequired
            name="newPass"
            label="New Password"
            showPass={showPass}
            onShowPass={() => setShowPass(!showPass)}
          />

          {/** Repeat new password */}
          <CustomPasswordForm
            isRequired
            name="repeatNewPass"
            label="Repeat Password"
            showPass={showPass}
            onShowPass={() => setShowPass(!showPass)}
          />

          {/** Button */}
          <CustomButton
            isNormal
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            Submit
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
export default FormResetPassword;
