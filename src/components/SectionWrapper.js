// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";
import CustomImage from "./CustomImage";
import { appImages } from "../config/data";

// Component
const SectionWrapper = ({
  rowData,
  headingClass,
  subHeadingClass,
  bannerClass,
  isReverse,
  showBtn,
  btnContent,
  ...rest
}) => {
  // Define rowData info
  const heading = rowData?.heading;
  const subHeading = rowData?.subHeading;
  const image = rowData?.image;

  // Debug
  //console.log("Debug sectionWrapper: ",)

  // Return component
  return (
    <section
      {...rest}
      className={`${isReverse ? "bg-gray-50" : "bg-white"} ${bannerClass}`}
    >
      {/** MAIN CONTAINER */}
      <div
        className={`
          container mx-auto flex flex-col-reverse px-6 py-24 md:flex-row 
          ${isReverse ? "md:flex-row-reverse" : ""}
        `}
      >
        {/** COL 1 */}
        <div
          className={`
            flex flex-col justify-center my-8 text-center space-y-6 md:w-1/2 md:my-0 
            ${isReverse ? " fadeRightMini" : " fadeLeftMini"}
            ${isReverse ? "md:text-right" : "md:text-left"}
          `}
        >
          {/** Heading */}
          <h1
            className={`
              max-w-md text-4xl font-bold text-gray-800 md:text-5xl 
              ${headingClass}
            `}
          >
            {heading}
          </h1>

          {/** Sub heading */}
          <p className={`max-w-md text-gray-500 ${subHeadingClass}`}>
            {subHeading}
          </p>

          {/** Button */}
          {showBtn && (
            <div className="flex justify-center md:justify-start">
              {btnContent}
            </div>
          )}
        </div>

        {/** COL 2 */}
        <div className="md:w-1/2">
          {/** Image */}
          <CustomImage image={image} alt={heading} width={580} height={525} />
        </div>
      </div>
    </section>
  ); // close return
}; // close component

// Export
export default SectionWrapper;
