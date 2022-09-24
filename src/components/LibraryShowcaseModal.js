// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";
import CustomModal from "./CustomModal";
import LibraryShowcase from "./LibraryShowcase";

// Component
const LibraryShowcaseModal = () => {
  // Debug
  //console.log("Debug libraryShowcaseModal: ",)

  // Return component
  return (
    <CustomModal
      //isStatic
      title="Library"
      modalID="libraryShowcaseModal"
      dialogDivClass="modal-lg"
    >
      {/** Library showcase component */}
      <LibraryShowcase />
    </CustomModal>
  ); // close return
}; // close component

// Export
export default LibraryShowcaseModal;
