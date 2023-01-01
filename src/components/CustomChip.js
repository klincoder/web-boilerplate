// Import resources
import React from "react";

// Import custom files
import twStyles from "../styles/twStyles";
import useAppSettings from "../hooks/useAppSettings";

// Component
const CustomChip = ({ isSolid, title, onClick, styleChip, ...rest }) => {
  // Define app settings
  const { isMounted } = useAppSettings();

  // Debug
  //console.log("Debug customChip: ",)

  // Return component
  return (
    <span
      {...rest}
      onClick={onClick}
      className={`${styleChip} 
      ${isSolid ? "bg-primary text-white" : "bg-white border-gray-400"} 
      flex text-sm px-3 py-1 rounded-full border align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease`}
    >
      {title || "Title"}
    </span>
  ); // close return
}; // close component

// Export
export default CustomChip;
