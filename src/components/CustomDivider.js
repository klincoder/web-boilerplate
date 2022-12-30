// Import resources
import React from "react";

// Import custom files
import twStyles from "../styles/twStyles";

// Component
const CustomDivider = ({ styleDivider, ...rest }) => {
  // Debug
  //console.log("Debug customDivider: ",)

  // Return component
  return <hr {...rest} className={styleDivider || "my-2"} />; // close return
}; // close component

// Export
export default CustomDivider;
