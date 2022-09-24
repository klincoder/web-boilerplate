// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";
import CustomAlertMsg from "./CustomAlertMsg";

// Component
const FormFeedback = ({ data }) => {
  // Debug
  //console.log("Debug formFeedback: ",)

  // Return component
  return (
    <>
      {/** If data */}
      {data?.type && (
        <CustomAlertMsg
          isNormal
          showBtn={data?.type === "succ" ? true : false}
          type={
            data?.type === "succ"
              ? "success"
              : data?.type === "err"
              ? "danger"
              : "warning"
          }
        >
          <div>{data?.msg}</div>
        </CustomAlertMsg>
      )}
    </>
  ); // close return
}; // close component

// Export
export default FormFeedback;
