// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";
import CustomImage from "./CustomImage";
import { appImages } from "../config/data";

// Component
const LogoIcon = () => {
  // Debug
  //console.log("Debug logoIcon: ",)

  // Return component
  return (
    <CustomButton isLink href="/">
      <a>
        <CustomImage
          image={appImages?.logo}
          alt="logo"
          width={60}
          height={60}
        />
      </a>
    </CustomButton>
  ); // close return
}; // close component

// Export
export default LogoIcon;
