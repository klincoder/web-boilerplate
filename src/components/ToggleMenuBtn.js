// Import resources
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiMenuAlt1 } from "react-icons/hi";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";

// Component
const ToggleMenuBtn = ({ isToggle, onClick }) => {
  // Debug
  //console.log("Debug ToggleMenuBtn: ",)

  // Return component
  return (
    <CustomButton
      isNormal
      id="toggleBtn"
      onClick={onClick}
      btnClass={`block text-gray-700 md:hidden focus:outline-none`}
    >
      {/** If isToggle */}
      {isToggle ? <AiOutlineClose size={30} /> : <HiMenuAlt1 size={30} />}
    </CustomButton>
  ); // close return
}; // close component

// Export
export default ToggleMenuBtn;
