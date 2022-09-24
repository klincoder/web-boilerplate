// Import resources
import React from "react";
import { AiOutlineFileImage } from "react-icons/ai";

// Import custom files
import tw from "../styles/twStyles";
import CustomImage from "./CustomImage";

// Component
const ImageShowcase = ({ newImage, oldImage, alt, width, height }) => {
  // Debug
  //console.log("Debug ImageShowcase: ",)

  // Return component
  return (
    <div className="flex flex-1 flex-col items-center justify-center mb-8 bg-white border-2 border-gray-300 border-dashed rounded-lg">
      {newImage || oldImage ? (
        <CustomImage
          image={newImage || oldImage}
          alt={alt || "image showcase"}
          width={width || 200}
          height={height || 250}
        />
      ) : (
        <div className="flex flex-col items-center py-12">
          <AiOutlineFileImage size={28} className="text-gray-400" />
          <span className="text-sm text-gray-500">No Image</span>
        </div>
      )}
    </div>
  ); // close return
}; // close component

// Export
export default ImageShowcase;
