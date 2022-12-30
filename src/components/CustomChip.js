// Import resources
import React from "react";

// Import custom files
import twStyles from "../styles/twStyles";
import useAppSettings from "../hooks/useAppSettings";

// Component
const CustomChip = () => {
  // Define app settings
  const { isMounted } = useAppSettings();

  // Debug
  //console.log("Debug customChip: ",)

  // Return component
  return (
    <span class="px-4 py-2 rounded-full border border-gray-300 text-gray-500 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
      Text
    </span>
  ); // close return
}; // close component

// Export
export default CustomChip;
