// Import resources
import React from "react";
import { useAlert } from "react-alert";
import copy from "copy-to-clipboard";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";

// Component
const CustomClipboard = ({
  variant,
  textToCopy,
  btnClass,
  succMsg,
  errMsg,
  children,
  ...rest
}) => {
  // Define alert
  const alert = useAlert();

  // Debug
  // console.log("Debug customClipboard: ", Clipboard);

  // Return
  return (
    <>
      <CustomButton
        {...rest}
        isNormal
        btnClass={btnClass || tw?.btnSecondary}
        onClick={() => {
          // Copy text
          copy(textToCopy);
          // Alert succ
          alert.success(succMsg || "Copied");
        }}
      >
        {children}
      </CustomButton>
    </>
  ); // close return
}; // close component

// Export
export default CustomClipboard;