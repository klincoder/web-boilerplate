// Import resources
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAlert } from "react-alert";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

// Import custom files
import tw from "../styles/twStyles";
import useAppSettings from "../hooks/useAppSettings";
import CustomButton from "./CustomButton";
import CustomSpinner from "./CustomSpinner";
import CustomSelectForm from "./CustomSelectForm";
import CustomTextInputForm from "./CustomTextInputForm";
import TiptapEditorForm from "./TiptapEditorForm";
import LabelBtnModal from "./LabelBtnModal";
import LabelBtnSlug from "./LabelBtnSlug";
import ImageShowcase from "./ImageShowcase";
import FormFeedback from "./FormFeedback";
import { useAuthContext } from "../context/AuthContext";
import { appRegex } from "../config/data";
import { allBlogCatAtom } from "../recoil/atoms";
import { fireDB, doc, setDoc, collection } from "../config/firebase";
import {
  handleGenSlug,
  handleIsValidUrl,
  handleSelectOptByTitle,
  handleUppercaseFirst,
} from "../config/functions";

// Component
const PostEditor = ({ rowData }) => {
  // Define auth context
  const { user } = useAuthContext();
  const userID = user?.id;
  const username = user?.username;
  const userEmail = user?.email;

  // Define rowData info
  const rowID = rowData?.id;
  const rowUserID = rowData?.userID;
  const rowTitle = rowData?.title;
  const rowImage = rowData?.titleImage;
  const rowCategory = rowData?.category;
  const rowSlug = rowData?.slug;
  const rowContent = rowData?.content;
  const rowExcerpt = rowData?.contentExcerpt;
  const rowStatus = rowData?.status;
  const rowDatePublished = rowData?.datePublished;

  // Define state
  const [formMsg, setFormMsg] = useState(null);
  const allBlogCategory = useRecoilValue(allBlogCatAtom);

  // Define app settings
  const { todaysDate } = useAppSettings();

  // Define isMounted
  const isMounted = useRef(false);

  // Define alert
  const alert = useAlert();

  // Define router
  const router = useRouter();

  // Define variables
  const categoryOpt = handleSelectOptByTitle(allBlogCategory);

  // Debug
  //console.log("Debug postEditor: ", rowExcerpt);

  // FORM CONFIG
  // Initial values
  const initialValues = {
    title: rowTitle ? rowTitle : "",
    titleImage: rowImage ? rowImage : "",
    category: rowCategory ? rowCategory : "general",
    content: rowContent ? rowContent : "",
    contentExcerpt: rowExcerpt ? rowExcerpt : "",
    slug: rowSlug ? rowSlug : "",
    status: rowStatus ? rowStatus : "inactive",
    disableSlug: true,
    isEditedSlug: false,
  };

  // Validate
  const validate = Yup.object({
    title: Yup.string()
      .required("Required")
      .min(30, "Too short")
      .max(100, "Too long"),
    titleImage: Yup.string()
      .required("Required")
      .matches(appRegex?.url, "Invalid url"),
    category: Yup.string().required("Required"),
    contentExcerpt: Yup.string().required("Required"),
    slug: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
  });

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values, { setSubmitting }) => {
    // Define variables
    const finalTitle = handleUppercaseFirst(values.title);
    const finalImage = values.titleImage;
    const finalCategory = values.category;
    const finalContent = values.content;
    const finalExcerpt = values.contentExcerpt;
    const finalSlug = values.slug;
    const finalStatus = values.status;
    const isPublishPost = finalStatus === "active";
    const finalDatePublished = rowDatePublished
      ? rowDatePublished
      : isPublishPost
      ? todaysDate
      : "";

    // Debug
    //console.log("Debug submitForm: ", values);

    // Try catch
    try {
      // If actionInput
      if (rowID) {
        // Edit post
        const editPostRef = doc(fireDB, "users", rowUserID, "blogPosts", rowID);
        // Await
        await setDoc(
          editPostRef,
          {
            title: finalTitle,
            titleImage: finalImage,
            category: finalCategory,
            content: finalContent,
            contentExcerpt: finalExcerpt,
            slug: finalSlug,
            status: finalStatus,
            dateUpdated: todaysDate,
            datePublished: finalDatePublished,
          },
          { merge: true }
        ); // close setDoc
      } else {
        // Add post to db
        const addPostRef = doc(
          collection(fireDB, "users", userID, "blogPosts")
        );
        // Await
        await setDoc(addPostRef, {
          id: addPostRef?.id,
          title: finalTitle,
          category: finalCategory,
          titleImage: finalImage,
          content: finalContent,
          contentExcerpt: finalExcerpt,
          slug: finalSlug,
          status: finalStatus,
          userID: userID,
          username: username,
          dateCreated: todaysDate,
          dateUpdated: todaysDate,
          datePublished: finalDatePublished,
        }); // close setDoc
      } // close if rowID
      // Alert succ
      alert.success("Post saved");
      router.push("/cms/all-blog");
    } catch (err) {
      setFormMsg({ type: "err", msg: err.message });
      //console.log("Debug handleSavePost: ", err.message);
    } // close try catch
    // Set submitting
    setSubmitting(false);
  }; // close submit form

  // SIDE EFFECTS
  // VALIDATE FILE INPUT
  // useEffect(() => {
  //   // On mount
  //   isMounted.current = true;
  //   // If empty args, return
  //   if (!rowID) return;
  //   // Set state
  //   setTitleInput(rowTitle);
  //   setTitleImageInput(rowImage);
  //   setContentState(contentHtml);
  //   setActionInput(rowStatus);
  //   // Clean up
  //   return () => {
  //     isMounted.current = false;
  //   };
  // }, [rowID, rowTitle, rowImage, rowContent, rowStatus, contentHtml]);

  // Return component
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={handleSubmitForm}
      enableReinitialize
    >
      {({ values, errors, isValid, isSubmitting, setFieldValue }) => {
        // Define variables
        const titleSlug = handleGenSlug(values.title);
        const slugInput = handleGenSlug(values.slug);
        const isValidUrl = handleIsValidUrl(values.titleImage);
        const disableSlug = values.disableSlug;
        const isEditedSlug = values.isEditedSlug;

        // Return form
        return (
          <Form autoComplete="" className="p-6 rounded-lg bg-white">
            {/** Debug */}
            {/* {console.log("Debug formValues:", errors)} */}

            {/** Form feedback */}
            <FormFeedback data={formMsg} />

            {/** ACTIONS */}
            <div className="flex items-center justify-end gap-3 mb-4">
              {/** Action input */}
              <CustomSelectForm
                isKeyValue
                name="status"
                data={[
                  { key: "Publish", value: "active" },
                  { key: "Draft", value: "inactive" },
                ]}
              />
              {/** Save post button */}
              <CustomButton
                isNormal
                type="submit"
                btnClass={`self-start ${tw?.btnPrimary}`}
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? <CustomSpinner /> : "Save Post"}
              </CustomButton>
            </div>

            {/** TILE CONTAINER */}
            <div className="flex flex-col md:flex-row md:gap-4">
              {/** COL 1 */}
              <div className="flex flex-col md:w-3/4 mb-8">
                {/** Title */}
                <CustomTextInputForm
                  isRequired
                  name="title"
                  label="Title"
                  placeholder="Enter blog title"
                  onKeyUp={() => {
                    !isEditedSlug && setFieldValue("slug", titleSlug);
                  }}
                />

                {/** Title image */}
                <CustomTextInputForm
                  isRequired
                  type="url"
                  name="titleImage"
                  placeholder="Enter image link"
                  label="Title Image"
                  labelRight={
                    <LabelBtnModal
                      name="libraryShowcaseBtn"
                      modalID="libraryShowcaseModal"
                      icon="upload"
                    />
                  }
                />

                {/** Category */}
                <CustomSelectForm
                  isRequired
                  name="category"
                  label="Category"
                  data={categoryOpt}
                  labelRight={
                    <LabelBtnModal
                      name="blogCategoryBtn"
                      modalID="blogCategoryModal"
                      icon="add"
                    />
                  }
                />

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
              </div>

              {/** COL 2 - IMAGE SHWOCASE */}
              <ImageShowcase
                newImage={isValidUrl && values.titleImage}
                oldImage={rowImage}
              />
            </div>

            {/** Content */}
            <div className="pb-3">
              <TiptapEditorForm
                name="content"
                label="Content"
                excerptName="contentExcerpt"
              />
            </div>
          </Form>
        ); // close return
      }}
    </Formik>
  ); // close return
}; // close component

// Export
export default PostEditor;
