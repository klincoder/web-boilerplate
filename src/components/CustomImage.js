// Import resources
import React from "react";
import Image from "next/image";

// Import custom files
import twStyles from "../styles/twStyles";
import { appImages } from "../config/data";

// Component
const CustomImage = ({ image, alt, styleImage, ...rest }) => {
  // Debug
  //console.log("Debug customImage: ",)

  // Return component
  return (
    <Image
      {...rest}
      alt={alt}
      src={image || appImages?.general}
      className={styleImage || "object-cover"}
    />
  ); // close return
}; // close component

// Export
export default CustomImage;
