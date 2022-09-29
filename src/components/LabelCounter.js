// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";

// Component
const LabelCounter = ({ val, maxCount, rest }) => {
  // Debug
  //console.log("Debug labelCounter: ",)

  // Return component
  return (
    <div {...rest} className="text-xs font-bold text-primary pl-1">
      {`${val?.length} / ${maxCount}`}
    </div>
  ); // close return
}; // close component

// Export
export default LabelCounter;
