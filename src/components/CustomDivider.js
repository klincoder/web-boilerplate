// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";

// Component
const CustomDivider = ({ dividerClass, rest }) => {
  // Debug
  //console.log("Debug customDivider: ",)

  // Return component
  return <hr className={dividerClass || "my-2"} {...rest} />; // close return
}; // close component

// Export
export default CustomDivider;
