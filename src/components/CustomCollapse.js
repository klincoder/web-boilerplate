// Import resources
import React from "react";
import { IoIosArrowDown } from "react-icons/io";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";

// Component
const CustomCollapse = ({
  divClass,
  title,
  titleID,
  titleDivClass,
  content,
  contentDivClass,
}) => {
  // Debug
  //console.log("Debug customCollapse: ",)

  // Return component
  return (
    <div className={`${divClass}`}>
      {/** Title */}
      <div className={`px-4 py-1 text-base font-bold text-gray-700 bg-gray-50`}>
        <CustomButton
          isNormal
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${titleID}`}
          aria-expanded="false"
          aria-controls={`collapse${titleID}`}
          btnClass="flex flex-row justify-between py-2 w-full focus:outline-none transition duration-150 ease-in-out"
        >
          <div className="text-left">{title}</div>
          <IoIosArrowDown size={24} className="w-10 h-6 ml-auto" />
        </CustomButton>
      </div>

      {/** Content */}
      <div id={`collapse${titleID}`} className={`collapse ${contentDivClass}`}>
        <div className="block text-gray-700 p-6 bg-white">{content}</div>
      </div>
    </div>
  ); // close return
}; // close component

// Export
export default CustomCollapse;
