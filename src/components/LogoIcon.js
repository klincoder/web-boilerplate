// Import resources
import React from "react";

// Import custom files
import twStyles from "../styles/twStyles";
import CustomButton from "./CustomButton";
import CustomImage from "./CustomImage";
import { appImages } from "../config/data";

// Component
const LogoIcon = ({ ...rest }) => {
  // Debug
  //console.log("Debug logoIcon: ",)

  // Return component
  return (
    <CustomButton {...rest} isLink href="/">
      <CustomImage
        image={appImages?.logo}
        alt="logo"
        width={60}
        height={60}
        priority
      />
    </CustomButton>
  ); // close return
}; // close component

// Export
export default LogoIcon;
