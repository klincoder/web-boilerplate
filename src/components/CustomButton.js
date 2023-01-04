// Import resources
import React from "react";
import Link from "next/link";

// Import custom files
import twStyles from "../styles/twStyles";

// Component
const CustomButton = ({
  isNormal,
  isSecondary,
  isLink,
  isModal,
  type,
  href,
  onClick,
  modalID,
  styleBtn,
  children,
  ...rest
}) => {
  // Debug
  //console.log("Debug customButton: ",)

  // Return component
  return (
    <>
      {/** IS NORMAL */}
      {isNormal && (
        <button
          {...rest}
          type={type || "button"}
          onClick={onClick}
          className={styleBtn || `w-full mt-3 ${twStyles?.btnPrimary}`}
        >
          {children}
        </button>
      )}

      {/** IS LINK */}
      {isLink && (
        <Link {...rest} href={href || "/"} className={styleBtn}>
          {children}
        </Link>
      )}

      {/** IS MODAL */}
      {isModal && (
        <button
          {...rest}
          type="button"
          onClick={onClick}
          data-bs-toggle="modal"
          data-bs-target={`#${modalID}`}
          className={styleBtn}
        >
          {children}
        </button>
      )}
    </>
  ); // close return
}; // close component

// Export
export default CustomButton;
