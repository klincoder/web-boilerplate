// Import resources
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAlert } from "react-alert";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";
import CustomSpinner from "./CustomSpinner";
import useAppSettings from "../hooks/useAppSettings";
import CustomTextInputForm from "./CustomTextInputForm";
import CustomTextareaForm from "./CustomTextareaForm";
import LabelBtnSlug from "./LabelBtnSlug";
import FormFeedback from "./FormFeedback";
import CustomSelectForm from "./CustomSelectForm";
import { useAuthContext } from "../context/AuthContext";
import { statusList } from "../config/data";
import { allBlogCatAtom } from "../recoil/atoms";
import { collection, doc, fireDB, setDoc } from "../config/firebase";
import {
  handleCategoryExist,
  handleGenSlug,
  handleSlugExist,
  handleUppercaseFirst,
} from "../config/functions";

// Component
const FormBlogCategory = ({ rowData, isModal }) => {
  // Define auth context
  const { user } = useAuthContext();
  const userID = user?.id;
  const username = user?.username;
  const userEmail = user?.email;

  // Define rowData info
  const rowID = rowData?.id;
  const rowUserID = rowData?.userID;
  const rowTitle = rowData?.title;
  const rowDesc = rowData?.description;
  const rowSlug = rowData?.slug;
  const rowStatus = rowData?.status;

  // Define state
  const [formMsg, setFormMsg] = useState(null);
  const allBlogCategory = useRecoilValue(allBlogCatAtom);

  // Define app settings
  const { todaysDate } = useAppSettings();

  // Define alert
  const alert = useAlert();

  // Define router
  const router = useRouter();

  // Debug
  //console.log("Debug formBlogCategory: ",)

  // FORM CONFIG
  // Initial values
  const initialValues = {
    title: rowTitle ? rowTitle : "",
    description: rowDesc ? rowDesc : "",
    slug: rowSlug ? rowSlug : "",
    status: rowStatus ? rowStatus : "active",
    disableSlug: true,
    isEditedSlug: false,
  };

  // Validate
  const validate = Yup.object({
    title: Yup.string().required("Required").max(50, "Too long"),
    description: Yup.string()
      .required("Required")
      .min(10, "Too short")
      .max(150, "Too long"),
    slug: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
  });

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values, { setSubmitting, resetForm }) => {
    // Define variables
    const finalTitle = handleUppercaseFirst(values.title?.trim());
    const finalDesc = handleUppercaseFirst(values.description?.trim());
    const categoryExist = handleCategoryExist(allBlogCategory, finalTitle);
    const slugExist = handleSlugExist(allBlogCategory, values.slug);

    // If categoryExist
    if (categoryExist?.isValid) {
      setFormMsg({ type: "err", msg: "Category exist" });
      return;
    } else if (slugExist?.isValid) {
      setFormMsg({ type: "err", msg: "Slug exist" });
      return;
    } // close if

    // Debug
    //console.log("Debug submitForm: ", values);

    // Try catch
    try {
      // If rowID
      if (rowID) {
        // Edit data
        const editCategoryRef = doc(
          fireDB,
          "users",
          rowUserID,
          "blogCategories",
          rowID
        );
        // Await
        await setDoc(editCategoryRef, {
          title: finalTitle,
          description: finalDesc,
          slug: values.slug,
          status: values.status,
          dateUpdated: todaysDate,
        });
      } else {
        // Add data
        const addCategoryRef = doc(
          collection(fireDB, "users", userID, "blogCategories")
        );
        // Await
        await setDoc(addCategoryRef, {
          id: addCategoryRef?.id,
          title: finalTitle,
          description: finalDesc,
          slug: values.slug,
          status: values.status,
          userID: userID,
          username: username,
          dateCreated: todaysDate,
          dateUpdated: todaysDate,
        });
      } // close if

      // If isModal
      if (isModal) {
        // Reset form
        resetForm();
        setFormMsg({ type: "succ", msg: "Created successfully" });
      } else {
        // Alert succ
        alert.success("Changes saved");
        router.push("/cms/all-blog-category");
      } // close if
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
      {({ values, errors, isValid, isSubmitting, setFieldValue }) => {
        // Define variables
        const titleSlug = handleGenSlug(values.title);
        const slugInput = handleGenSlug(values.slug);
        const disableSlug = values.disableSlug;
        const isEditedSlug = values.isEditedSlug;

        // Return form
        return (
          <Form autoComplete="" className="p-6 rounded-lg bg-white">
            {/** Debug */}
            {/* {console.log("Debug formValues:", } */}

            {/** Form feedback */}
            <FormFeedback data={formMsg} />

            {/** Title row */}
            <div className="flex gap-3">
              {/** Title */}
              <CustomTextInputForm
                name="title"
                label="Title"
                divClass="w-1/2"
                onKeyUp={() => {
                  !isEditedSlug && setFieldValue("slug", titleSlug);
                }}
              />

              {/** Status */}
              <CustomSelectForm
                name="status"
                label="Status"
                data={statusList}
                divClass="w-1/2"
              />
            </div>

            {/** Description */}
            <CustomTextareaForm name="description" label="Description" />

            {/** Slug */}
            <CustomTextInputForm
              isRequired
              name="slug"
              placeholder="Enter slug"
              helperText={`Preview: ${slugInput}`}
              onKeyUp={() => setFieldValue("slug", slugInput)}
              disabled={disableSlug}
              label="Slug"
              labelRight={
                <LabelBtnSlug
                  slugID={values.slug}
                  oldSlug={rowSlug}
                  disableSlug={disableSlug}
                  onClickSave={() => setFieldValue("disableSlug", true)}
                  onClickEdit={() => {
                    setFieldValue("disableSlug", false);
                    setFieldValue("isEditedSlug", true);
                  }}
                />
              }
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
export default FormBlogCategory;
