// Import resources
import React from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";

// Component
const LibraryUploadBtn = () => {
  // Debug
  //console.log("Debug libraryUploadBtn: ",)

  // Return component
  return (
    <div className="text-primary">
      {/** Button */}
      <CustomButton
        isModal
        id="libraryShocaseBtn"
        modalID="libraryShowcaseModal"
      >
        <AiOutlineCloudUpload size={20} />
      </CustomButton>
    </div>
  ); // close return
}; // close component

// Export
export default LibraryUploadBtn;
