// Import resources
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAlert } from "react-alert";
import { useRouter } from "next/router";
import {
  AiOutlineCloudUpload,
  AiOutlineEdit,
  AiOutlineFileImage,
  AiOutlineSave,
} from "react-icons/ai";

// Import custom files
import tw from "../styles/twStyles";
import useAppSettings from "../hooks/useAppSettings";
import CustomTextInput from "./CustomTextInput";
import CustomSelect from "./CustomSelect";
import CustomButton from "./CustomButton";
import CustomSpinner from "./CustomSpinner";
import CustomImage from "./CustomImage";
import TiptapEditor from "./TiptapEditor";
import LibraryUploadBtn from "./LibraryUploadBtn";
import CustomSelectForm from "./CustomSelectForm";
import CustomTextInputForm from "./CustomTextInputForm";
import TiptapEditorForm from "./TiptapEditorForm";
import { useAuthContext } from "../context/AuthContext";
import { fireDB, doc, setDoc, collection } from "../config/firebase";
import { handleGenBlogSlug } from "../config/functions";
import ImageShowcase from "./ImageShowcase";

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
  const rowStatus = rowData?.status?.toLowerCase();
  const rowDatePublished = rowData?.datePublished;

  // Define state
  const [loading, setLoading] = useState(false);
  const [titleInput, setTitleInput] = useState(rowTitle || "");
  const [titleImageInput, setTitleImageInput] = useState(rowImage || "");
  const [contentState, setContentState] = useState(rowContent);
  const contentHtml = contentState?.htmlVal || "";
  const contentText = contentState?.textVal || "";
  const [actionInput, setActionInput] = useState(rowStatus || "inactive");
  const [categoryInput, setCategoryInput] = useState(rowCategory || "General");
  const [slugInput, setSlugInput] = useState(rowSlug || "");
  const [disableSlug, setDisableSlug] = useState(true);

  // Define app settings
  const { todaysDate } = useAppSettings();

  // Define alert
  const alert = useAlert();

  // Define router
  const router = useRouter();

  // Define isMounted
  const isMounted = useRef(false);

  // Define blog info
  const blogSlug = handleGenBlogSlug(titleInput) || "";
  const isPublishPost = actionInput === "active";
  const finalContent = rowContent ? rowContent : contentHtml;
  const finalExcerpt = rowExcerpt ? rowExcerpt : contentText;
  const finalImage = titleImageInput || rowImage;
  const finalCategory = categoryInput || rowCategory;
  const finalStatus = isPublishPost ? "active" : "inactive";
  const isValidImage = finalImage ? true : false;
  const finalDatePublished = rowDatePublished
    ? rowDatePublished
    : isPublishPost
    ? todaysDate
    : "";
  const isValidForm =
    titleInput && isValidImage && finalExcerpt && actionInput ? true : false;

  // Debug
  //console.log("Debug postEditor: ", rowContent);

  // FORM CONFIG
  // Initial values
  const initialValues = {
    title: rowTitle ? rowTitle : "",
    titleImage: rowImage ? rowImage : "",
    category: rowCategory ? rowCategory : "general",
    slug: rowSlug ? rowSlug : "",
    content: rowContent ? rowContent : "",
    contextExcerpt: rowExcerpt ? rowExcerpt : "",
    status: rowStatus ? rowStatus : "inactive",
  };

  // Validate
  const validate = Yup.object({
    username: Yup.string().required("Required").max(50, "Too long"),
    title: Yup.string().required("Required").max(100, "Too long"),
    titleImage: Yup.string().required("Required").url(),
    category: Yup.string().required("Required"),
    slug: Yup.string().required("Required"),
    contextExcerpt: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
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
  }; // close submit form

  // HANDLE SAVE POST
  // const handleSavePost = async () => {
  //   // If empty args, return
  //   if (!userID) return;
  //   // Set loading
  //   setLoading(true);
  //   // Try catch
  //   try {
  //     // If actionInput
  //     if (rowID) {
  //       // Edit post
  //       const editPostRef = doc(fireDB, "users", rowUserID, "blogPosts", rowID);
  //       // Await
  //       await setDoc(
  //         editPostRef,
  //         {
  //           title: titleInput,
  //           category: finalCategory,
  //           titleImage: finalImage,
  //           content: finalContent,
  //           excerpt: finalExcerpt,
  //           slug: blogSlug,
  //           status: finalStatus,
  //           dateUpdated: todaysDate,
  //           datePublished: finalDatePublished,
  //         },
  //         { merge: true }
  //       ); // close setDoc
  //     } else {
  //       // Add post to db
  //       const addPostRef = doc(
  //         collection(fireDB, "users", userID, "blogPosts")
  //       );
  //       // Await
  //       await setDoc(
  //         addPostRef,
  //         {
  //           id: addPostRef?.id,
  //           title: titleInput,
  //           category: finalCategory,
  //           titleImage: finalImage || "",
  //           content: finalContent,
  //           excerpt: finalExcerpt,
  //           slug: blogSlug,
  //           status: finalStatus,
  //           userID: userID,
  //           username: username,
  //           userEmail: userEmail,
  //           dateCreated: todaysDate,
  //           dateUpdated: todaysDate,
  //           datePublished: finalDatePublished,
  //         },
  //         { merge: true }
  //       ); // close setDoc
  //     } // close if rowID
  //     // Set loading
  //     setLoading(false);
  //     alert.success("Post saved");
  //     router.push("/cms/all-blog");
  //   } catch (err) {
  //     alert.error(err.message);
  //     setLoading(false);
  //     //console.log("Debug handleSavePost: ", err.message);
  //   } // close try catch
  // }; // close fxn

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
    >
      {({ values, errors, isValid, isSubmitting }) => {
        // Define variables
        const titleSlug = handleGenBlogSlug(values.title);
        const slugInput = handleGenBlogSlug(values.slug);

        // Return form
        return (
          <Form autoComplete="" className="p-6 rounded-lg bg-white">
            {/** Debug */}
            {/* {console.log("Debug formValues:", } */}

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
                />

                {/** Title image */}
                <CustomTextInputForm
                  isRequired
                  name="titleImage"
                  placeholder="Enter image link"
                  label="Title Image"
                  labelRight={<LibraryUploadBtn />}
                />

                {/** Category */}
                <CustomSelectForm
                  isRequired
                  name="category"
                  label="Category"
                  data={["General"]}
                />

                {/** Slug */}
                <CustomTextInputForm
                  isRequired
                  name="slug"
                  placeholder="Enter slug"
                  helperText={`Preview: ${values.slug}`}
                  disabled={disableSlug}
                  label="Slug"
                  labelRight={
                    <div className="flex flex-col justify-center">
                      <div>
                        {disableSlug ? (
                          <CustomButton
                            isNormal
                            onClick={() => setDisableSlug(false)}
                            btnClass={`!text-primary ${tw?.btnLink}`}
                          >
                            <AiOutlineEdit size={18} />
                          </CustomButton>
                        ) : (
                          <CustomButton
                            isNormal
                            onClick={() => setDisableSlug(!disableSlug)}
                            btnClass={`!text-primary ${tw?.btnLink}`}
                          >
                            <AiOutlineSave size={18} />
                          </CustomButton>
                        )}
                      </div>
                      {/** If rowSlug */}
                      {rowSlug && (
                        <span className="text-xs text-danger">
                          (WARNING: Editing might affect SEO)
                        </span>
                      )}
                    </div>
                  }
                />
              </div>
              {/** COL 2 - IMAGE SHWOCASE */}
              <ImageShowcase newImage={values.titleImage} oldImage={rowImage} />
              =
            </div>

            {/** Content */}
            <div className="pb-3">
              <TiptapEditorForm
                name="content"
                label="Content"
                excerptName="contextExcerpt"
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
