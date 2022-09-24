// Import resources
import React, { useEffect, useRef, useState } from "react";
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
import { fireDB, doc, setDoc, collection } from "../config/firebase";
import { handleGenBlogSlug } from "../config/functions";

// Component
const PostEditor = ({
  rowData,
  titleDivClass,
  titleImageDivClass,
  contentDivClass,
}) => {
  // Define rowData info
  const rowID = rowData?.id;
  const rowUserID = rowData?.userID;
  const rowTitle = rowData?.title;
  const rowTitleImage = rowData?.titleImage;
  const rowContent = rowData?.content;
  const rowImage = rowData?.titleImage;
  const rowCategory = rowData?.category;
  const rowExcerpt = rowData?.excerpt;
  const rowSlug = rowData?.slug;
  const rowStatus = rowData?.status?.toLowerCase();
  const rowDatePublished = rowData?.datePublished;

  // Define state
  const [loading, setLoading] = useState(false);
  const [titleInput, setTitleInput] = useState(rowTitle || "");
  const [titleImageInput, setTitleImageInput] = useState(rowTitleImage || "");
  const [contentState, setContentState] = useState(rowContent);
  const contentHtml = contentState?.htmlVal || "";
  const contentText = contentState?.textVal || "";
  const [actionInput, setActionInput] = useState(rowStatus || "inactive");
  const [categoryInput, setCategoryInput] = useState(rowCategory || "General");
  const [slugInput, setSlugInput] = useState(rowSlug || "");
  const [disableSlug, setDisableSlug] = useState(true);

  // Define app settings
  const { userID, username, userEmail, todaysDate } = useAppSettings();

  // Define alert
  const alert = useAlert();

  // Define router
  const router = useRouter();

  // Define isMounted
  const isMounted = useRef(null);

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

  // FUNCTIONS
  // HANDLE SAVE POST
  const handleSavePost = async () => {
    // If empty args, return
    if (!userID) return;
    // Set loading
    setLoading(true);
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
            title: titleInput,
            category: finalCategory,
            titleImage: finalImage,
            content: finalContent,
            excerpt: finalExcerpt,
            slug: blogSlug,
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
        await setDoc(
          addPostRef,
          {
            id: addPostRef?.id,
            title: titleInput,
            category: finalCategory,
            titleImage: finalImage || "",
            content: finalContent,
            excerpt: finalExcerpt,
            slug: blogSlug,
            status: finalStatus,
            userID: userID,
            username: username,
            userEmail: userEmail,
            dateCreated: todaysDate,
            dateUpdated: todaysDate,
            datePublished: finalDatePublished,
          },
          { merge: true }
        ); // close setDoc
      } // close if rowID
      // Set loading
      setLoading(false);
      alert.success("Post saved");
      router.push("/cms/all-blog");
    } catch (err) {
      alert.error(err.message);
      setLoading(false);
      //console.log("Debug handleSavePost: ", err.message);
    } // close try catch
  }; // close fxn

  // SIDE EFFECTS
  // VALIDATE FILE INPUT
  useEffect(() => {
    // On mount
    isMounted.current = true;
    // If empty args, return
    if (!rowID) return;
    // Set state
    setTitleInput(rowTitle);
    setTitleImageInput(rowTitleImage);
    setContentState(contentHtml);
    setActionInput(rowStatus);
    // Clean up
    return () => {
      isMounted.current = false;
    };
  }, [rowID, rowTitle, rowTitleImage, rowContent, rowStatus, contentHtml]);

  // Return component
  return (
    <>
      {/** ACTIONS */}
      <div className="flex flex-col-reverse mb-4 md:flex-row md:justify-between">
        {/** LEFT CONTAINER */}
        <div className="flex flex-col gap-3 md:flex-row">
          {/** Category */}
          <CustomSelect
            name="categoryInput"
            label="Category"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            data={["General"]}
          />
          {/** Action input */}
          <CustomSelect
            isKeyValue
            name="actionInput"
            label="Status"
            value={actionInput}
            onChange={(e) => setActionInput(e.target.value)}
            data={[
              { key: "Publish", value: "active" },
              { key: "Draft", value: "inactive" },
            ]}
          />
        </div>

        {/** RIGHT CONTAINER */}
        <div className="flex flex-col gap-3 mb-4 md:mb-0">
          {/** Save post button */}
          <CustomButton
            isNormal
            onClick={handleSavePost}
            btnClass={`${tw?.btnPrimary}`}
            disabled={!isValidForm}
          >
            {loading ? <CustomSpinner /> : "Save Post"}
          </CustomButton>
        </div>
      </div>

      {/** TILE CONTAINER */}
      <div className="flex flex-col md:flex-row md:gap-4">
        {/** COL 1 */}
        <div className="flex flex-col md:w-3/4 mb-8">
          {/** Title input */}
          <CustomTextInput
            name="titleInput"
            label="Blog Title"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            placeholder="Enter blog title"
            //helperText={`slug: ${blogSlug}`}
            divClass={`mb-4 ${titleDivClass}`}
          />
          {/** Title image input */}
          <CustomTextInput
            name="imageInput"
            value={titleImageInput}
            onChange={(e) => setTitleImageInput(e.target.value)}
            placeholder="Enter blog image link"
            divClass={`mb-4 ${titleImageDivClass}`}
            label={
              <div className="flex gap-3">
                <div>Blog Image Link</div>
                <LibraryUploadBtn />
              </div>
            }
          />
          {/** Slug input */}
          <CustomTextInput
            name="slug"
            placeholder="Slug"
            divClass="mb-2"
            disabled={disableSlug}
            helperText={`Preview: ${slugInput}`}
            onKeyUp={() => setSlugInput(e.target.value)}
            label={
              <div className="flex items-center gap-3">
                <span>Slug</span>
                <div className="flex items-center text-primary cursor-pointer">
                  {disableSlug ? (
                    <AiOutlineEdit
                      size={18}
                      onClick={() => setDisableSlug(false)}
                    />
                  ) : (
                    <AiOutlineSave
                      size={18}
                      onClick={() => setDisableSlug(!disableSlug)}
                    />
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

        {/** IMAGE SHWOCASE */}
        <div className="flex flex-1 flex-col items-center justify-center mb-8 bg-white border-2 border-gray-300 border-dashed rounded-lg">
          {/** If rowImage */}
          {titleImageInput || rowImage ? (
            <CustomImage
              image={titleImageInput || rowImage}
              alt={rowSlug}
              width={200}
              height={250}
            />
          ) : (
            <div className="flex flex-col items-center py-12">
              <AiOutlineFileImage size={28} className="text-gray-400" />
              <span className="text-sm text-gray-500">No Image</span>
            </div>
          )}
        </div>
      </div>

      {/** CONTENT */}
      <div className={`pb-3 ${contentDivClass}`}>
        <TiptapEditor
          contentState={contentState}
          setContentState={setContentState}
        />
      </div>

      {/** SEO CONTAINER */}
      {/** Seo title */}
      {/** Seo description */}
    </>
  ); // close return
}; // close component

// Export
export default PostEditor;
