// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";
import CustomCollapse from "./CustomCollapse";

// Component
const FaqsItem = ({ rowData, divClass, ...rest }) => {
  // Define row data info
  const rowID = rowData?.id;
  const rowQuestion = rowData?.question;
  const rowAnswer = rowData?.answer;

  // Debug
  //console.log("Debug faqsItem: ",)

  // Return component
  return (
    <CustomCollapse
      divClass="border-2 mb-4"
      titleID={rowID}
      title={rowQuestion}
      content={rowAnswer}
    />
  ); // close return
}; // close component

// Export
export default FaqsItem;
