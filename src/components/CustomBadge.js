// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";
import { handleStatusColor } from "../config/functions";

// Component
const CustomBadge = ({ title, titleBg, ...rest }) => {
  // Debug
  //console.log("Debug CustomBadge: ",)

  // Return component
  return (
    <div className="flex justify-center">
      <span
        className={`
        ${handleStatusColor(titleBg || title)} 
        text-xs text-center font-semibold text-white rounded-full inline-block px-2 py-1 leading-none whitespace-nowrap align-baseline`}
      >
        {title}
      </span>
    </div>
  ); // close return
}; // close component

// Export
export default CustomBadge;
