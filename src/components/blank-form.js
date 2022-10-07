// Import resources
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";
import CustomSpinner from "./CustomSpinner";
import useAppSettings from "../hooks/useAppSettings";
import CustomTextInputForm from "./CustomTextInputForm";
import FormFeedback from "./FormFeedback";
import { useAuthContext } from "../context/AuthContext";
import { collection, fireDB, doc, setDoc } from "../config/firebase";

// Component
const FormBlank = ({ isQuery, rowData }) => {
  // Define auth context
  const { user } = useAuthContext();
  const userID = user?.id;
  const username = user?.username;
  const userEmail = user?.email;

  // Define state
  const [formMsg, setFormMsg] = useState(null);

  // Define app settings
  const { todaysDate, router, alert } = useAppSettings();

  // Define rowData info
  const rowID = rowData?.id;

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
    //const finalUsername = values.username?.trim()?.toLowerCase();

    // Debug
    console.log("Debug submitForm: ", values);

    // Try catch
    try {
      // Add to db
      const docRef = doc(collection(fireDB, "appSettings"));
      await setDoc(docRef, {
        id: docRef?.id,
        dateCreated: todaysDate,
        dateUpdated: todaysDate,
      });
    } catch (err) {
      setFormMsg({ type: "err", msg: err.message });
      //console.log("Debug submitForm: ", err.message)
    } // close try catch
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
      {({ values, errors, isValid, isSubmitting }) => {
        // Define variables
        const testVar = "";

        // Return form
        return (
          <Form autoComplete="off">
            {/** Debug */}
            {/* {console.log("Debug formValues:", } */}

            {/** Form feedback */}
            <FormFeedback data={formMsg} />

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
        ); // close return
      }}
    </Formik>
  ); // close return
}; // close component

// Export
export default FormBlank;
