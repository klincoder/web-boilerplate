// Import resources
import React from "react";

// Import custom files
import CustomImage from "./CustomImage";
import { appImages } from "../config/data";

// Component
const CustomLoader = () => {
  // Define loaderColors
  const loaderColors = [
    "bg-primary loader-circle-1",
    "bg-success loader-circle-2",
    "bg-danger loader-circle-3",
  ];

  // Return component
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {/** Logo */}
      <div className="mb-2">
        <CustomImage
          image={appImages?.logo}
          alt="custom loader"
          width={80}
          height={80}
        />
      </div>

      {/** Spinner */}
      <div className="flex items-center justify-center space-x-2 rounded-full">
        {/** Loop loaderColors */}
        {loaderColors?.length > 0 &&
          loaderColors?.map((item, index) => (
            <div
              key={item + index}
              className={`${item} p-2 w-4 h-4 rounded-full animate-bounce`}
            />
          ))}
      </div>
    </div>
  ); // close return
}; // close component

// Export
export default CustomLoader;
