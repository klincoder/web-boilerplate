// Import resources
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiMenuAlt1 } from "react-icons/hi";

// Import custom files
import twStyles from "../styles/twStyles";
import CustomButton from "./CustomButton";

// Component
const ToggleMenuBtn = ({ isToggle, onClick }) => {
  // Debug
  //console.log("Debug toggleMenuBtn: ",)

  // Return component
  return (
    <CustomButton
      isNormal
      id="toggleBtn"
      onClick={onClick}
      styleBtn={`block text-gray-700 md:hidden focus:outline-none`}
    >
      {isToggle ? <AiOutlineClose size={30} /> : <HiMenuAlt1 size={30} />}
    </CustomButton>
  ); // close return
}; // close component

// Export
export default ToggleMenuBtn;
