// Import resources
import React from "react";

// Import custom files
import twStyles from "../styles/twStyles";
import CustomButton from "./CustomButton";

// Component
const CustomModal = ({
  isStatic,
  title,
  modalID,
  cancelText,
  confirmText,
  onConfirm,
  showConfirm,
  styleContainer,
  styleModalContainer,
  children,
  ...rest
}) => {
  // Debug
  //console.log("Debug customModal: ",)

  // Return component
  return (
    <div
      id={modalID}
      tabIndex="-1"
      aria-labelledby={title}
      aria-hidden="true"
      //data-bs-backdrop={isStatic ? "static" : ""}
      className={`${styleContainer} modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto`}
    >
      {/** Modal content */}
      <div
        className={`${styleModalContainer} modal-dialog modal-dialog-scrollable relative w-auto pointer-events-none`}
      >
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          {/** Header */}
          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            {/** Title */}
            <h5 id={title} className="text-xl text-gray-800 font-bold">
              {title}
            </h5>
            {/** Close button */}
            <CustomButton
              isNormal
              data-bs-dismiss="modal"
              aria-label="Close"
              styleBtn="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            />
          </div>

          {/** Body */}
          <div className="modal-body relative p-4">{children}</div>

          {/** Footer */}
          <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            {/** Cancel button */}
            <CustomButton
              isNormal
              data-bs-dismiss="modal"
              styleBtn={twStyles?.btnDanger}
            >
              {cancelText || "Cancel"}
            </CustomButton>

            {/** Confirm button */}
            {showConfirm && (
              <CustomButton
                isNormal
                data-bs-dismiss="modal"
                onClick={onConfirm}
                styleBtn={`ml-3 ${twStyles?.btnSuccess}`}
              >
                {confirmText || "Confirm"}
              </CustomButton>
            )}
          </div>
        </div>
      </div>
    </div>
  ); // close return
}; // close component

// Export
export default CustomModal;
