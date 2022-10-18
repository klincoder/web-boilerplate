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
import CustomDivider from "./CustomDivider";
import LabelCounter from "./LabelCounter";
import { alertMsg } from "../config/data";
import { doc, fireDB, setDoc } from "../config/firebase";
import { handleTitleCase, handleUppercaseFirst } from "../config/functions";

// Component
const FormAllFaqs = ({ rowData }) => {
  // Define state
  const [formMsg, setFormMsg] = useState(null);

  // Define app settings
  const { todaysDate, router, alert } = useAppSettings();

  // Define rowData info
  const rowID = "pageFaqs";
  const rowTitle = rowData?.title; // Page meta
  const rowDesc = rowData?.description;
  const rowIntroHeading = rowData?.sectionIntro?.heading; // Intro

  // Debug
  //console.log("Debug formAllFaqs: ", rowData);

  // FORM CONFIG
  // Initial values
  const initialValues = {
    title: rowTitle ? rowTitle : "",
    description: rowDesc ? rowDesc : "",
    introHeading: rowIntroHeading ? rowIntroHeading : "",
  };

  // Validate
  const validate = Yup.object({
    title: Yup.string()
      .required("Required")
      .min(3, "Too short")
      .max(62, "Too long"),
    description: Yup.string()
      .required("Required")
      .min(10, "Too short")
      .max(100, "Too long"),
    introHeading: Yup.string()
      .required("Required")
      .min(10, "Too short")
      .max(200, "Too long"),
  });

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values, { setSubmitting }) => {
    // Define variables
    const finalTitle = handleTitleCase(values.title);
    const finalDesc = handleUppercaseFirst(values.description);
    const finalIntro = {
      heading: handleUppercaseFirst(values.introHeading),
    };

    // Debug
    //console.log("Debug submitForm: ", values);

    // Try catch
    try {
      // Edit doc
      const editDocRef = doc(fireDB, "appSettings", rowID);
      await setDoc(
        editDocRef,
        {
          title: finalTitle,
          description: finalDesc,
          sectionIntro: finalIntro,
          dateUpdated: todaysDate,
        },
        { merge: true }
      );
      // Alert succ
      alert.success("Changes saved");
      setFormMsg(null);
    } catch (err) {
      alert.error(alertMsg?.general);
      //setFormMsg({ type: "err", msg: err.message });
      console.log("Debug submitForm: ", err.message);
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
      enableReinitialize
    >
      {({ values, errors, isValid, isSubmitting }) => {
        // Define variables
        // Return form
        return (
          <Form autoComplete="">
            {/** Debug */}
            {/* {console.log("Debug formValues:", errors)} */}

            {/** Form feedback */}
            {/* <FormFeedback data={formMsg} /> */}

            {/** PAGE DETAILS CONTAINER */}
            <div className="px-6 py-4 mb-8 rounded-lg shadow-lg bg-white">
              {/** PAGE META */}
              <div className="mb-8">
                <h5>Page Meta (For SEO)</h5>
                <CustomDivider dividerClass="my-4" />
                {/** Title */}
                <CustomTextInputForm isRequired name="title" label="Title" />
                {/** Description */}
                <CustomTextareaForm
                  isRequired
                  name="description"
                  label="Description"
                  labelRight={
                    <LabelCounter val={values.description} maxCount={100} />
                  }
                />
              </div>

              {/** INTRO SECTION */}
              <div className="mb-8">
                <h5>Intro Section</h5>
                <CustomDivider dividerClass="my-4" />
                {/** Heading */}
                <CustomTextareaForm
                  isRequired
                  name="introHeading"
                  label="Heading"
                  labelRight={
                    <LabelCounter val={values.introHeading} maxCount={200} />
                  }
                />
              </div>

              {/** BUTTON */}
              <div className="text-center">
                <CustomButton
                  isNormal
                  type="submit"
                  disabled={!isValid || isSubmitting}
                >
                  Save Changes
                  {isSubmitting && <CustomSpinner />}
                </CustomButton>
              </div>
            </div>
          </Form>
        ); // cloe return
      }}
    </Formik>
  ); // close return
}; // close component

// Export
export default FormAllFaqs;
