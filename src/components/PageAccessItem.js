// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";

// Component
const PageAccessItem = ({ title }) => {
  // Debug
  //console.log("Debug pageAccessItem: ",)

  // Return component
  return (
    <div className="alert alert-danger alert-link text-center">
      {/** Title */}
      <div>{title || "Unathourized access."}</div>

      {/** Button */}
      <CustomButton isLink href="/cms">
        <a className="text-base underline">Back to dashboard.</a>
      </CustomButton>
    </div>
  ); // close return
}; // close component

// Export
export default PageAccessItem;
