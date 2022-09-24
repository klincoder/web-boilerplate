// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";

// Component
const CustomSpinner = () => {
  // Debug
  //console.log("Debug customSpinner: ",)

  // Return component
  return (
    <div
      role="status"
      className="spinner-grow inline-block w-4 h-4 bg-current rounded-full opacity-0"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  ); // close return
}; // close component

// Export
export default CustomSpinner;
