// Import resources
import React from "react";
import {
  AiOutlineCloudUpload,
  AiOutlineEdit,
  AiOutlinePlus,
} from "react-icons/ai";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";

// Component
const LabelBtnModal = ({ name, modalID, icon, ...rest }) => {
  // Debug
  //console.log("Debug labelBtnModal: ",)

  // Return component
  return (
    <div className="text-primary">
      {/** Button */}
      <CustomButton isModal id={name} modalID={modalID} {...rest}>
        {/** If icon */}
        {icon === "upload" && <AiOutlineCloudUpload size={20} />}
        {icon === "add" && <AiOutlinePlus size={20} />}
        {icon === "edit" && <AiOutlineEdit size={20} />}
      </CustomButton>
    </div>
  ); // close return
}; // close component

// Export
export default LabelBtnModal;
