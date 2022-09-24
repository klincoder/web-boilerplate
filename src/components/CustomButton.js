// Import resources
import React from "react";
import Link from "next/link";

// Import custom files
import tw from "../styles/twStyles";

// Component
const CustomButton = ({
  isNormal,
  isSecondary,
  type,
  onClick,
  btnClass,
  isLink,
  href,
  isModal,
  modalID,
  children,
  ...rest
}) => {
  // Debug
  //console.log("Debug customButton: ",)

  // Return component
  return (
    <>
      {/** IsNormal */}
      {isNormal && (
        <button
          {...rest}
          type={type || "button"}
          onClick={onClick}
          className={
            btnClass ||
            `w-full mt-3 ${isSecondary ? tw?.btnSecondary : tw?.btnPrimary}`
          }
        >
          {children}
        </button>
      )}

      {/** IsLink */}
      {isLink && (
        <Link href={href || "/"} {...rest}>
          {children}
        </Link>
      )}

      {/** IsModal */}
      {isModal && (
        <button
          {...rest}
          type="button"
          onClick={onClick}
          data-bs-toggle="modal"
          data-bs-target={`#${modalID}`}
        >
          {children}
        </button>
      )}
    </>
  ); // close return
}; // close component

// Export
export default CustomButton;
