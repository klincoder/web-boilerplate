// Import resources
import React from "react";
import { AiOutlineEdit, AiOutlineSave } from "react-icons/ai";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";

// Component
const LabelBtnSlug = ({
  slugID,
  disableSlug,
  onClickEdit,
  onClickSave,
  oldSlug,
}) => {
  // Debug
  //console.log("Debug labelBtnSlug: ",)

  // Return component
  return (
    <div className="flex justify-center gap-2">
      {/** If disableSlug */}
      {disableSlug ? (
        // Edit
        <CustomButton
          isNormal
          id={slugID}
          btnClass={`!text-primary ${tw?.btnLink}`}
          onClick={onClickEdit}
        >
          <AiOutlineEdit size={18} />
        </CustomButton>
      ) : (
        // Save
        <CustomButton
          isNormal
          id={slugID}
          btnClass={`!text-primary ${tw?.btnLink}`}
          onClick={onClickSave}
        >
          <AiOutlineSave size={18} />
        </CustomButton>
      )}

      {/** If oldSlug */}
      {oldSlug && (
        <span className="text-xs text-danger">
          (WARNING: Editing might affect SEO)
        </span>
      )}
    </div>
  ); // close return
}; // close component

// Export
export default LabelBtnSlug;
