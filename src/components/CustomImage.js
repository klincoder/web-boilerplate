// Import resources
import React from "react";
import Image from "next/image";

// Import custom files
import tw from "../styles/twStyles";
import { appImages } from "../config/data";

// Component
const CustomImage = ({ image, alt, imgClass, ...rest }) => {
  // Debug
  //console.log("Debug CustomImage: ",)

  // Return component
  return (
    <Image
      {...rest}
      src={image || appImages?.general}
      alt={alt}
      className={imgClass || "object-contain"}
    />
  ); // close return
}; // close component

// Export
export default CustomImage;
