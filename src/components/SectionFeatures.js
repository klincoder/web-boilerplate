// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";
import FeaturesItem from "./FeaturesItem";

// Component
const SectionFeatures = ({ rowData, ...rest }) => {
  // Define rowData info
  const heading = rowData?.heading;
  const subHeading = rowData?.subHeading;
  const features = rowData?.features;

  // Debug
  //console.log("Debug sectionFeatures: ",)

  // Return component
  return (
    <section className="bg-gray-50" {...rest}>
      {/** MAIN CONTAINER */}
      <div className="container flex flex-col mx-auto px-6 py-24">
        {/** COL 1 - HEADING */}
        <div className="flex flex-col items-center justify-center text-center pb-12">
          {/** Heading */}
          <h2>{heading}</h2>

          {/** Sub heading */}
          <p className="pt-2 max-w-md text-gray-500">{subHeading}</p>
        </div>

        {/** COL 2 - FEATURES */}
        <div className="grid md:grid-cols-3 md:gap-x-12">
          {/** Loop features */}
          {features?.length > 0 &&
            features?.map((item, index) => (
              <FeaturesItem key={item?.id} rowData={item} rowIndex={index} />
            ))}
        </div>
      </div>
    </section>
  ); // close return
}; // close component

// Export
export default SectionFeatures;
