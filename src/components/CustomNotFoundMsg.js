// Import resources
import React from "react";
import { AiOutlineWarning } from "react-icons/ai";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";

// Component
const CustomNotFoundMsg = ({
  divClass,
  title,
  btnLink,
  btnText,
  showBtn,
  ...rest
}) => {
  // Debug
  //console.log("Debug customNotFoundMsg: ",)

  // Return component
  return (
    <div className={`flex flex-col items-center justify-center ${divClass}`}>
      {/** Icon */}
      <AiOutlineWarning size={80} className="text-gray-200" />

      {/** Title */}
      <div className="text-xl text-gray-700 mb-6">{title || "Not Found"}</div>

      {/** Button */}
      {showBtn && (
        <CustomButton isLink href={btnLink || "/"}>
          <a className={tw?.btnPrimary}>{btnText || "Back to home"}</a>
        </CustomButton>
      )}
    </div>
  ); // close return
}; // close component

// Export
export default CustomNotFoundMsg;
