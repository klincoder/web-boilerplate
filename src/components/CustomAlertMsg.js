// Import resources
import React from "react";
import { AiOutlineWarning } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";

// Component
const CustomAlertMsg = ({
  isNormal,
  type,
  showBtn,
  divClass,
  title,
  btnLink,
  btnText,
  children,
  ...rest
}) => {
  // Debug
  //console.log("Debug customAlertMsg: ",)

  // Return component
  return (
    <>
      {/** If isNormal */}
      {isNormal ? (
        // Show colored alert message
        <div
          role="alert"
          className={`
            alert alert-dismissible py-5 px-6 mb-6 flex flex-row justify-between rounded-lg fade show
            ${divClass}
            ${type === "primary" && "bg-blue-100 text-primary font-bold"}
            ${type === "success" && "bg-green-100 text-green-700 font-bold"}
            ${type === "warning" && "bg-yellow-100 text-yellow-700 font-bold"}
            ${type === "danger" && "bg-red-100 text-red-700 font-bold"}
          `}
        >
          {/** Children */}
          <div>{children}</div>
          {/** Button */}
          <div>
            {showBtn && (
              <CustomButton
                isNormal
                data-bs-dismiss="alert"
                aria-label="Close"
                btnClass="btn-close box-content w-3 h-3 p-1 ml-auto text-gray-800 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-yellow-900 hover:opacity-75 hover:no-underline"
              ></CustomButton>
            )}
          </div>
        </div>
      ) : (
        // Show data not found message
        <div
          className={`flex flex-col items-center justify-center ${divClass}`}
        >
          {/** Icon */}
          <AiOutlineWarning size={80} className="text-gray-200" />

          {/** Title */}
          <div className="text-xl text-gray-700 mb-6">
            {title || "Not Found"}
          </div>

          {/** Button */}
          {showBtn && (
            <CustomButton isLink href={btnLink || "/"}>
              <a className={tw?.btnPrimary}>{btnText || "Back to home"}</a>
            </CustomButton>
          )}
        </div>
      )}
    </>
  ); // close return
}; // close component

// Export
export default CustomAlertMsg;
