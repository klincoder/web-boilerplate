// Import resources
import React from "react";
import { useRecoilValue } from "recoil";
import { FaTimes } from "react-icons/fa";
import { useAlert } from "react-alert";
import {
  AiOutlineCloudUpload,
  AiOutlineCopy,
  AiOutlineDelete,
} from "react-icons/ai";

// Import custom files
import tw from "../styles/twStyles";
import CustomDivider from "./CustomDivider";
import CustomFileInput from "./CustomFileInput";
import CustomAlertMsg from "./CustomAlertMsg";
import CustomImage from "./CustomImage";
import CustomClipboard from "./CustomClipboard";
import CustomButton from "./CustomButton";
import useUploadFile from "../hooks/useUploadFile";
import useAppSettings from "../hooks/useAppSettings";
import CustomSpinner from "./CustomSpinner";
import CustomModal from "./CustomModal";
import { useAuthContext } from "../context/AuthContext";
import { appLibraryAtom } from "../recoil/atoms";
import { alertMsg } from "../config/data";
import { fireDB, collection, doc, setDoc, deleteDoc } from "../config/firebase";

// Component
const LibraryShowcase = () => {
  // Define auth context
  const { user } = useAuthContext();
  const userID = user?.id;
  const username = user?.username;

  // Define state
  const appLibrary = useRecoilValue(appLibraryAtom);
  const appLibraryLen = appLibrary?.length;

  // Define file info
  const maxFileCount = 5;
  const fileExtensions = ["jpg", "jpeg", "png", "svg"];

  // Define upload file hook
  const {
    loading,
    filesToAccept,
    allowUpload,
    selectedFiles,
    isAllowUpload,
    fileInput,
    setFileInput,
    setLoading,
    handleRemoveFile,
    handleFileUpload,
    handleResetFileInput,
  } = useUploadFile(maxFileCount, fileExtensions);

  // Define app settings
  const { todaysDate } = useAppSettings();

  // Define alert
  const alert = useAlert();

  // Debug
  //console.log("Debug libraryShowcase 1: ", selectedFiles );

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = async () => {
    // If isAllowUpload
    if (isAllowUpload) {
      // Try catch
      try {
        // Set loading
        setLoading(true);
        // Upload files, get url and add to database
        // Loop selectedFiles
        await Promise.all(
          selectedFiles?.map(async (item) => {
            // Define file variables
            const fileBlob = item?.blob;
            const fileName = item?.newFileName;
            const rawFileName = item?.name;
            const fileType = item?.type;
            const fileSize = item?.size;
            // Check if rawTitle exist
            const getRawTitle = appLibrary?.filter(
              (item) => item?.rawTitle === rawFileName
            );
            const isRawTitle = getRawTitle?.length > 0;
            // If !isRawTitle
            if (!isRawTitle) {
              // Get upload url
              const getUploadUrl = await handleFileUpload(fileBlob, fileName);
              // Add file to database
              const addFileRef = doc(collection(fireDB, "appLibrary"));
              await setDoc(addFileRef, {
                id: addFileRef?.id,
                title: fileName,
                rawTitle: rawFileName,
                link: getUploadUrl,
                type: fileType,
                size: fileSize,
                userID: userID,
                username: username,
                dateCreated: todaysDate,
              });
            } // close if
          }) // close loop
        ); // close promise all
        // Alert succ
        alert.success("Upload successful");
        setLoading(false);
        handleResetFileInput();
      } catch (err) {
        alert.error(err.message);
        setLoading(false);
        console.log("Debug libraryShowcase: ", err.message);
      } // cloe try catch
    } else {
      alert.error(alertMsg?.general);
    } // close if
  }; // close fxn

  // HANDLE DELETE FILE
  const handleDeleteFile = async (rowID) => {
    // If empty args, return
    if (!rowID) return;
    // Set loading
    setLoading(true);
    // Try catch
    try {
      // Delete file from db
      const deleteFAQRef = doc(fireDB, "appLibrary", rowID);
      await deleteDoc(deleteFAQRef);
      // Alert succ
      alert.success("Delete successful");
      setLoading(false);
    } catch (err) {
      alert.error(err.message);
      setLoading(false);
      //console.log("Debug: ", err.message)
    } // close try catch
  }; // close fxn

  // Return component
  return (
    <>
      {/** File input container */}
      <div className="relative flex flex-col">
        {/** File input */}
        <CustomFileInput
          multiple
          id="fileInput"
          name="fileInput"
          inputClass="invisible"
          accept={filesToAccept}
          disabled={loading}
          onChange={(e) => {
            // Define variables
            const val = e.target.files;
            const objArr = Object.values(val);
            setFileInput(objArr);
            //console.log("Debug fileInput: ", { val, objArr });
          }} // close onChange
          label={
            <>
              {/** Choose files */}
              <div className="flex flex-col items-center justify-center p-6 w-full h-full bg-white border-2 rounded-lg cursor-pointer">
                <AiOutlineCloudUpload size={34} />
                <span className="text-center">Choose files</span>
              </div>
              {/** Button */}
              <div className="mt-3">
                <CustomButton
                  isNormal
                  onClick={handleSubmitForm}
                  disabled={loading || !allowUpload}
                >
                  {loading ? <CustomSpinner /> : "Upload"}
                </CustomButton>
              </div>
            </>
          } // close label
        />

        {/** Selected files */}
        {selectedFiles?.length > 0 && (
          <div className="flex flex-row flex-wrap gap-3 mt-2 mb-8">
            {selectedFiles?.map((item, index) => (
              <div key={index + 1} className="relative">
                {/** Image */}
                <div>
                  <CustomImage
                    image={item?.blobLink}
                    alt={item?.name}
                    imgClass="object-cover rounded-full"
                    width={80}
                    height={80}
                  />
                </div>
                {/** Remove icon */}
                <div className="absolute top-0 right-0 bottom-0 left-50">
                  <CustomButton
                    isNormal
                    onClick={() => handleRemoveFile(item?.name)}
                    btnClass="text-sm text-danger bg-white rounded-full"
                  >
                    <FaTimes size={24} />
                  </CustomButton>
                </div>
                {/** Show err msg */}
                {!item?.isValid && (
                  <div className="text-xs text-danger text-center">
                    {item?.msg}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/** Divider */}
      <CustomDivider dividerClass="mt-1 mb-8" />

      {/** All files */}
      <div className="flex flex-col w-full">
        {/** If appLibraryLLen */}
        {appLibraryLen < 1 ? (
          <CustomAlertMsg title="No files found" />
        ) : (
          <div className="grid md:gap-x-12 md:grid-cols-3">
            {/** Loop appLibrary */}
            {appLibrary?.map((item) => (
              <div key={item?.id} className="shadow-lg rounded-lg mb-8">
                {/** Image */}
                <CustomImage
                  image={item?.link}
                  alt={item?.title}
                  imgClass="object-contain"
                  width={400}
                  height={300}
                />
                {/** Button container */}
                <div className="flex flex-row items-center justify-around px-4 py-2 bg-gray-100">
                  {/** Copy */}
                  <CustomClipboard textToCopy={item?.link} btnClass="text-sm">
                    <span className="flex">
                      <AiOutlineCopy size={20} />
                    </span>
                  </CustomClipboard>
                  {/** Delete */}
                  <CustomButton
                    isModal
                    modalID={`del${item?.id}`}
                    className="text-sm text-lightDanger"
                  >
                    <span className="flex">
                      <AiOutlineDelete size={20} />
                    </span>
                  </CustomButton>
                </div>
                {/** MODAL */}
                <CustomModal
                  showConfirm
                  title="Delete File"
                  modalID={`del${item?.id}`}
                  onConfirm={() => handleDeleteFile(item?.id)}
                >
                  Please confirm this permanent deletion.
                </CustomModal>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  ); // close return
}; // close component

// Export
export default LibraryShowcase;
