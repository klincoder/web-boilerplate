// Import resources
import { useEffect, useMemo, useState } from "react";
import { useAlert } from "react-alert";

// Import custom files
import { useAuthContext } from "../context/AuthContext";
import { handleFilesToAccept } from "../config/functions";
import {
  fireStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "../config/firebase";

// Component
const useUploadFile = (maxFileCount, fileExtensions) => {
  // Define auth context
  const { user } = useAuthContext();
  const username = user?.username;

  // Define state
  const [loading, setLoading] = useState(false);
  const [fileInput, setFileInput] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [allowUpload, setAllowUpload] = useState(false);

  // Define alert
  const alert = useAlert();

  // Define file info
  const fileInputLen = fileInput?.length;
  const filesToAccept = handleFilesToAccept(fileExtensions);
  const isMaxFileCount = fileInputLen > maxFileCount;
  const selectedFilesLen = selectedFiles?.length;
  const isAllowUpload = allowUpload === true && selectedFilesLen > 0;
  const finalFileExt = useMemo(() => {
    return fileExtensions;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debug
  //console.log("Debug useUploadFile: ");

  // FUNCTIONS
  // HANDLE RESET FILES INPUT
  const handleResetFileInput = () => {
    setFileInput([]);
    setSelectedFiles([]);
    setAllowUpload(false);
  }; // close if

  // HANDLE REMOVE FILE
  const handleRemoveFile = (selectedFileName) => {
    // If empty args, return
    if (!selectedFiles || !selectedFileName) return;
    // Create array by selecting files !== selectedFileName
    const newFileInput = fileInput?.filter(
      (item) => item?.name !== selectedFileName
    );
    const newSelectedFiles = selectedFiles?.filter(
      (item) => item?.name !== selectedFileName
    );
    // Set allow upload to false if len < 1
    if (newFileInput?.length < 1 || newSelectedFiles?.length < 1) {
      setAllowUpload(false);
    } // close if
    // Set state
    setFileInput(newFileInput);
    setSelectedFiles(newSelectedFiles);
    //console.log("Debug useUploadFile: ", { newFileInput, newSelectedFiles });
  }; // close fxn

  // HANDLE FILE UPLOAD
  const handleFileUpload = async (fileInput, newFileName, folder) => {
    // If empty args, return null
    if (!fileInput || !newFileName) return null;
    // Define file validations
    folder = folder || username;
    // Create storage ref
    const storageRef = ref(fireStorage, `/${folder}/${newFileName}`);
    const uploadTask = await uploadBytesResumable(storageRef, fileInput);
    const url = await getDownloadURL(uploadTask.ref);
    //console.log("Debug fxnUploadUrl: ", url);
    return url;
  }; // close fxn

  // SIDE EFFECTS
  // FILE VALIDATIONS
  useEffect(() => {
    // If empty args, return
    // HANDLE SINGLE FILE VALIDATION
    const handleSingleFileValidation = (file, prefix) => {
      // If empty args, return null
      if (!file || !prefix || !finalFileExt) return null;
      // Define variables
      let isValid, msg;
      const randomCode = Math.floor(Math.random() * 999999 + 1);
      const fileName = file?.name;
      const fileSize = file?.size;
      const fileType = file?.type?.split("/").pop();
      const fileTypeIsValid = finalFileExt?.includes(fileType);
      const newFileName = prefix + "-" + randomCode + "." + fileType;
      // Validations
      if (!fileName) {
        isValid = false;
        msg = "No file selected";
      } else if (fileSize > 3200000) {
        isValid = false;
        msg = "File too big"; // Max 3mb - 3,200,000
      } else if (fileTypeIsValid === false) {
        isValid = false;
        msg = "Invalid file format";
      } else {
        isValid = true;
        msg = "Valid file";
      } // close if fileName
      // Return
      return { isValid, msg, newFileName };
    }; // close fxn

    // HANDLE BULK FILE VALIDATION
    const handleBulkFileValidation = () => {
      // Define variables
      let errMsg;
      //let filesLen = files?.length;
      // If empty arrgs, return
      if (!fileInput || fileInputLen < 1) return;
      // If isMmaxFileCount
      if (isMaxFileCount) {
        errMsg = `Number of files exceeded`;
      } // close if
      // If errMsg
      if (errMsg) {
        // Alert err
        alert.error(errMsg);
        handleResetFileInput();
        return;
      } else {
        // Loop files to validate all files
        const validationArr = fileInput?.map((item) => {
          return handleSingleFileValidation(item, username);
        }); // close loop
        // Check if upload show be allowed
        const isValidArr = validationArr?.map((item) => item?.isValid);
        const isAllowUpload = isValidArr?.includes(false) === false;
        // Generate newFilesArr with validations
        const newFilesArr = fileInput?.map((item, index) => {
          // Define obj
          const obj = {
            name: item?.name,
            size: item?.size,
            type: item?.type,
            isValid: validationArr[index]?.isValid,
            msg: validationArr[index]?.msg,
            newFileName: validationArr[index]?.newFileName,
            webkitRelativePath: item?.webkitRelativePath,
            blob: item,
            blobLink: URL.createObjectURL(item),
          };
          // Return
          return obj;
        }); // close loop
        // Set state
        setSelectedFiles(newFilesArr);
        setAllowUpload(isAllowUpload);
        // Return
        //return { newFilesArr, isAllowUpload, errMsg };
        // Debug
        //console.log("Debug useUploadFile: ", { newFilesArr, isAllowUpload });
      } // close if
    }; // close fxn
    // Call handleBulkFileValidation
    handleBulkFileValidation();
  }, [fileInput, fileInputLen, alert, isMaxFileCount, finalFileExt, username]);

  // Return component
  return {
    loading,
    filesToAccept,
    allowUpload,
    selectedFiles,
    fileInput,
    isAllowUpload,
    setFileInput,
    setLoading,
    handleRemoveFile,
    handleFileUpload,
    handleResetFileInput,
  }; // close return
}; // close component

// Export
export default useUploadFile;
