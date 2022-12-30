// Import resources
import React from "react";

// Import custom files
import twStyles from "../styles/twStyles";

// Component
const CustomHelperText = ({ isError, title, visible }) => {
  // If empty args, return null
  if (!visible || !title) return null;

  // Debug
  //console.log("Debug customHelperText: ",)

  // Return component
  return (
    <>
      {/** IF VISIBLE */}
      {visible && (
        <div
          className={`
            text-xs pt-1 
            ${isError ? "text-danger" : "text-gray-400"}
          `}
        >
          {title}
        </div>
      )}
    </>
  ); // close return
}; // close component

// Export
export default CustomHelperText;
