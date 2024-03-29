// Import resources
import React from "react";

// Import custom files
import twStyles from "../styles/twStyles";
import useAppSettings from "../hooks/useAppSettings";

// Component
const BlankComponent = () => {
  // Define app settings
  const { isMounted } = useAppSettings();

  // Debug
  //console.log("Debug blankComponent: ",)

  // Return component
  return (
    <div>
      <p>Content goes here</p>
    </div>
  ); // close return
}; // close component

// Export
export default BlankComponent;
