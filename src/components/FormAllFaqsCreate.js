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
import CustomSelectForm from "./CustomSelectForm";
import FormFeedback from "./FormFeedback";
import TiptapEditorForm from "./TiptapEditorForm";
import { alertMsg, faqsCategoryList, statusList } from "../config/data";
import { handleIsValidUrl, handleUppercaseFirst } from "../config/functions";
import { collection, doc, fireDB, setDoc } from "../config/firebase";

// Component
const FormAllFaqsCreate = ({ rowData }) => {
  // Define state
  const [formMsg, setFormMsg] = useState(null);

  // Define app settings
  const { todaysDate, router, alert } = useAppSettings();

  // Define rowData info
  const rowID = rowData?.id;
  const rowQuestion = rowData?.question;
  const rowAnswer = rowData?.answer;
  const rowCategory = rowData?.category;
  const rowStatus = rowData?.status;

  // Debug
  //console.log("Debug FormAllFaqsCreate: ",)

  // FORM CONFIG
  // Initial values
  const initialValues = {
    question: rowQuestion ? rowQuestion : "",
    answer: rowAnswer ? rowAnswer : "",
    category: rowCategory ? rowCategory : "general",
    status: rowStatus ? rowStatus : "inactive",
  };

  // Validate
  const validate = Yup.object({
    question: Yup.string().required("Required").max(30, "Too long"),
    category: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
  });

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values, { setSubmitting }) => {
    // Define variables
    const finalQuestion = handleUppercaseFirst(values.question);
    const finalAnswer = values.answer;
    const finalCategory = values.category;
    const finalStatus = values.status === rowStatus ? rowStatus : values.status;
    // Debug
    //console.log("Debug submitForm: ", values);
    // Try catch
    try {
      // If rowID
      if (rowID) {
        // Edit doc
        const editRef = doc(fireDB, "faqs", rowID);
        await setDoc(
          editRef,
          {
            question: finalQuestion,
            answer: finalAnswer,
            category: finalCategory,
            status: finalStatus,
            dateUpdated: todaysDate,
          },
          { merge: true }
        );
      } else {
        // Add doc
        const addRef = doc(collection(fireDB, "faqs"));
        await setDoc(addRef, {
          id: addRef?.id,
          question: finalQuestion,
          answer: finalAnswer,
          category: finalCategory,
          status: finalStatus,
          dateCreated: todaysDate,
          dateUpdated: todaysDate,
        });
      } // close if
      // Alert succ
      alert.success("Action successful");
      setFormMsg(null);
      router.push("/cms/all-faqs");
    } catch (err) {
      alert.error(alertMsg?.general);
      //setFormMsg({ type: "err", msg: err.message });
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
        const isValidUrl = handleIsValidUrl(values.image);

        // Return form
        return (
          <Form autoComplete="" className="p-6 rounded-xl bg-white">
            {/** Debug */}
            {/* {console.log("Debug formValues:", values)} */}

            {/** Form feedback */}
            <FormFeedback data={formMsg} />

            {/** Question */}
            <CustomTextInputForm
              isRequired
              name="question"
              label="Question"
              placeholder="Enter question"
            />

            {/** Category */}
            <CustomSelectForm
              isRequired
              name="category"
              label="Catgeory"
              data={faqsCategoryList}
            />

            {/** Status */}
            <CustomSelectForm
              isRequired
              name="status"
              label="Status"
              data={statusList}
            />

            {/** Answer */}
            <TiptapEditorForm
              name="answer"
              label="Answer"
              //excerptName="contentExcerpt"
            />

            {/** Button */}
            <div className="text-center">
              <CustomButton
                isNormal
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                {rowID ? "Save Changes" : "Create"}
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
export default FormAllFaqsCreate;
