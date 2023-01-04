// Import resources
import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiCheckCircle } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";
import { AiOutlineWarning } from "react-icons/ai";

// Import custom files
import twStyles from "../styles/twStyles";
import CustomButton from "./CustomButton";

// Component
const CustomAlertMsg = ({
  isNormal,
  isIcon,
  icon,
  type,
  title,
  description,
  actions,
  ...rest
}) => {
  // Define variables
  const isSucc = type === "success";
  icon = icon || <AiOutlineInfoCircle {...rest} size={60} />;
  title = title || "Title";

  // Debug
  //console.log("Debug customAlertMsg: ",)

  // FUNCTIONS
  // HANDLE SHOW ICON
  const handleShowIcon = () => {
    // Switch
    switch (type) {
      case "success":
        return <FiCheckCircle {...rest} size={60} className="text-success" />;
      case "error":
        return <AiOutlineWarning {...rest} size={60} className="text-danger" />;
      default:
        return (
          <AiOutlineInfoCircle {...rest} size={60} className="text-gray-700" />
        );
    } // close fxn
  }; // close fxn

  // HANDLE TITLE COLOR
  const handleTitleColor = () => {
    // Switch
    switch (type) {
      case "success":
        return "text-success";
      case "error":
        return "text-danger";
      default:
        return "text-gray-700";
    } // close fxn
  }; // close fxn

  // Return component
  return (
    <>
      {/** IS ICON */}
      {isIcon && (
        <div className="flex flex-col items-center justify-center">
          {/** Icon */}
          <div className="mb-2">{handleShowIcon()}</div>

          {/** Title */}
          <h4 className={`text-center ${handleTitleColor()}`}>{title}</h4>

          {/** Description */}
          {description && (
            <div className="text-center -mt-2 mb-4">{description}</div>
          )}

          {/** Actions */}
          {actions && actions}
        </div>
      )}

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
    </>
  ); // close return
}; // close component

// Export
export default CustomAlertMsg;
