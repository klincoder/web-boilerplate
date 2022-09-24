// Import resources
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAlert } from "react-alert";
import { useRouter } from "next/router";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";
import CustomSpinner from "./CustomSpinner";
import useAppSettings from "../hooks/useAppSettings";
import CustomTextInputForm from "./CustomTextInputForm";

// Component
const FormBlank = ({ isQuery }) => {
  // Define state
  const [showState, setShowState] = useState(false);

  // Define app settings
  const { todaysDate } = useAppSettings();

  // Define alert
  const alert = useAlert();

  // Debug
  //console.log("Debug formBlank: ",)

  // FORM CONFIG
  // Initial values
  const initialValues = {
    username: "",
  };

  // Validate
  const validate = Yup.object({
    username: Yup.string().required("Required").max(50, "Too long"),
  });

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values, { setSubmitting }) => {
    // Define variables
    const finalUsername = values.username?.trim()?.toLowerCase();
    // Debug
    console.log("Debug submitForm: ", finalUsername);
    // Set submitting
    setSubmitting(false);
  }; // close fxn

  // Return component
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={handleSubmitForm}
    >
      {({ values, errors, isValid, isSubmitting }) => (
        <Form autoComplete="off">
          {/** Debug */}
          {/* {console.log("Debug formValues:", } */}

          {/** Username */}
          <CustomTextInputForm name="username" label="Username or email" />

          {/** Button */}
          <div className="text-center">
            <CustomButton
              isNormal
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Submit
              {isSubmitting && <CustomSpinner />}
            </CustomButton>
          </div>
        </Form>
      )}
    </Formik>
  ); // close return
}; // close component

// Export
export default FormBlank;
