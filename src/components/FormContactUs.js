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
import CustomTextareaForm from "./CustomTextareaForm";
import { collection, doc, fireDB, setDoc } from "../config/firebase";

// Component
const FormContactUs = () => {
  // Define state
  const [showPass, setShowPass] = useState(false);

  // Define app settings
  const { todaysDate } = useAppSettings();

  // Define alert
  const alert = useAlert();

  // Define router
  const router = useRouter();
  const routeHasQuery = Object.keys(router.query)?.length > 0;

  // Debug
  //console.log("Debug formContactUs: ",)

  // FORM CONFIG
  // Define initial values
  const initialValues = {
    fullName: "",
    emailAddr: "",
    msg: "",
  };

  // Validation
  const validate = Yup.object({
    fullName: Yup.string().required("Required").max(50, "Too long"),
    emailAddr: Yup.string().required("Required").email("Invalid email address"),
    msg: Yup.string()
      .required("Required")
      .min(15, "Too short")
      .max(2000, "Too long"),
  });

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const onSubmit = async (values, { setSubmitting }) => {
    // Define variables
    const finalName = values.fullName?.trim()?.toLowerCase();
    const finalEmailAddr = values.emailAddr?.trim()?.toLowerCase();
    const finalMsg = values.fullName
      ?.trim()
      ?.replace(/[\r?\n]+/, "")
      ?.toLowerCase();

    // Debug
    //console.log("Debug submitForm: ", finalUsername);

    // Try catch
    try {
      // Add message to db
      const addMsgRef = doc(collection(fireDB, "contactForm"));
      // Await
      await setDoc(addMsgRef, {
        id: addMsgRef?.id,
        fullName: finalName,
        emailAddress: finalEmailAddr,
        message: finalMsg,
        dateCreated: todaysDate,
        dateUpdated: todaysDate,
      });

      // Send email to admin
      //handleAdminEmail()
    } catch (err) {
      alert.error(err.message);
    } // close try catch
    // Set submitting
    setSubmitting(false);
  }; // close fxn

  // Return component
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={onSubmit}
    >
      {({ values, errors, isValid, isSubmitting }) => (
        <Form autoComplete="off">
          {/** Debug */}
          {/* {console.log("Debug formValues:", } */}

          {/** Full name */}
          <CustomTextInputForm name="fullName" label="Full Name" />

          {/** Email address */}
          <CustomTextInputForm name="emailAddr" label="Your Email" />

          {/** Message */}
          <CustomTextareaForm name="msg" label="Message" />

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
export default FormContactUs;
