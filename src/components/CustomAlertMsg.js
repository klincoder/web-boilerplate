// Import resources
import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

// Import custom files
import twStyles from "../styles/twStyles";
import CustomButton from "./CustomButton";

// Component
const CustomAlertMsg = ({ isNormal, isIcon, title, icon, actions }) => {
  // Define variables
  icon = icon || <AiOutlineInfoCircle />;
  title = title || "Unathourized access.";

  // Debug
  //console.log("Debug customAlertMsg: ",)

  // Return component
  return (
    <>
      {/** IS NORMAL */}
      {isNormal && (
        <div className="alert alert-danger alert-link text-center">
          {/** Icon */}
          <div>{icon}</div>
          {/** Title */}
          <div>{title}</div>
          {/** Button */}
          <CustomButton isLink href="/cms" className="text-base underline">
            Back to dashboard.
          </CustomButton>
        </div>
      )}

      {/** IS ICON */}
      {isIcon && (
        <div className="flex flex-col items-center justify-center">
          {/** Icon */}
          <div>{icon}</div>
          {/** Title */}
          <div>{title}</div>
          {/** Actions */}
          {actions && actions}
        </div>
      )}
    </>
  ); // close return
}; // close component

// Export
export default CustomAlertMsg;
