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
import CustomTextareaForm from "./CustomTextareaForm";
import { collection, doc, fireDB, setDoc } from "../config/firebase";
import { alertMsg, apiRoutes } from "../config/data";

// Component
const FormContactUs = () => {
  // Define app settings
  const { todaysDate, alert, siteInfo } = useAppSettings();

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
  const handleSubmitForm = async (values, { resetForm, setSubmitting }) => {
    // Define variables
    const finalName = values.fullName?.trim()?.toLowerCase();
    const finalEmail = values.emailAddr?.trim()?.toLowerCase();
    const finalMsg = values.fullName
      ?.trim()
      ?.replace(/[\r?\n]+/, "")
      ?.toLowerCase();
    // Define email msg
    const emailMsg = {
      sender: finalName,
      subject: "Contact form submission",
      msg: finalMsg,
    };

    // Debug
    //console.log("Debug submitForm: ", finalUsername);

    // Try catch
    try {
      // Add message to db
      const addMsgRef = doc(collection(fireDB, "contactForm"));
      await setDoc(addMsgRef, {
        id: addMsgRef?.id,
        fullName: finalName,
        emailAddress: finalEmail,
        message: finalMsg,
        dateCreated: todaysDate,
        dateUpdated: todaysDate,
      });

      // Send email to admin
      await handleAdminEmail(
        "admin",
        siteInfo?.adminName,
        siteInfo?.adminEmail,
        emailMsg,
        apiRoutes?.contactForm
      );

      // Alert succ
      alert.success("Message sent");
      resetForm();
    } catch (err) {
      alert.error(alertMsg?.general);
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
      {({ values, errors, isValid, isSubmitting }) => (
        <Form autoComplete="">
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
