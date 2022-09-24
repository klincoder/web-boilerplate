// Import resources
import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

// Import custom files
import CustomButton from "./CustomButton";

// Component
const ScrollUpButton = () => {
  // Define state for button visibility
  const [isVisible, setIsVisible] = useState(false);

  // Debug
  // console.log("Debug scrollUpBtn: ", isVisible);

  // FUNCTIONS
  // HANDLE BUTTON VISIBILITY
  const handleBtnVisibility = () => {
    // If window page y-azis offset
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    } // close if
  }; // close fxn

  // HANDLE SCROLL UP
  const handleScrollUp = () => {
    // Set the top cordinate to 0
    // Make scrolling smooth
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }; // close fxn

  // SIDE EFFECTS
  // LISTEN TO SCROLL EVENT
  useEffect(() => {
    // Listen to page scroll
    window.addEventListener("scroll", handleBtnVisibility);
    // Clean up
    return () => window.removeEventListener("scroll", handleBtnVisibility);
  }, []);

  // Return component
  return (
    <>
      {isVisible && (
        <CustomButton
          isNormal
          id="scrollUpBtn"
          onClick={handleScrollUp}
          btnClass="bottom-5 right-5 fixed p-4 bg-primary text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-lightPrimary hover:shadow-lg focus:bg-lightPrimary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary active:shadow-lg transition duration-150 ease-in-out"
        >
          <FaArrowUp />
        </CustomButton>
      )}
    </>
  ); // close return
}; // close component

// Export
export default ScrollUpButton;
