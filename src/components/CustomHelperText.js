// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";

// Component
const CustomHelperText = ({ title, visible, isError }) => {
  // If empty args, return null
  if (!visible || !title) return null;

  // Debug
  //console.log("Debug customHelperText: ",)

  // Return component
  return (
    <>
      {/** If visible */}
      {visible && (
        <div
          className={`text-xs pt-1 ${
            isError ? "text-danger" : "text-gray-400"
          }`}
        >
          {title}
        </div>
      )}
    </>
  ); // close return
}; // close component

// Export
export default CustomHelperText;
