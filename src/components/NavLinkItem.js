// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";

// Component
const NavLinkItem = ({ rowData, linkClass }) => {
  // Debug
  //console.log("Debug navLinkItem: ",)

  // Return component
  return (
    <CustomButton isLink href={rowData?.link}>
      <a
        className={`${linkClass} text-gray-700 no-underline hover:text-primary`}
      >
        {rowData?.title}
      </a>
    </CustomButton>
  ); // close return
}; // close component

// Export
export default NavLinkItem;
