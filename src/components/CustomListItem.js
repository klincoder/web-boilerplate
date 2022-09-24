// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";
import CustomImage from "./CustomImage";
import { appImages } from "../config/data";

// Component
const CustomListItem = ({
  title,
  description,
  image,
  divClass,
  titleClass,
  descClass,
  ...rest
}) => {
  // Debug
  //console.log("Debug customListItem: ",)

  // Return component
  return (
    <div className={`${divClass} px-3 mb-8 w-full flex items-center`}>
      {/** Image */}
      <div className="flex items-center justify-center p-2 w-14 h-14 bg-primary rounded-md shadow-md">
        <CustomImage
          {...rest}
          image={image}
          alt={title}
          width={50}
          height={50}
        />
      </div>

      {/** Content */}
      <div className="gorw ml-4">
        {/** Title */}
        <div className={`font-bold ${titleClass}`}>{title || "Title"}</div>
        {/** Description */}
        {description && (
          <div className={`text-sm text-gray-500 ${descClass}`}>
            {description || "Description"}
          </div>
        )}
      </div>
    </div>
  ); // close return
}; // close component

// Export
export default CustomListItem;
