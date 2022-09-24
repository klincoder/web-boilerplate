// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";
import CtaDownloadApp from "./CtaDownloadApp";

// Component
const CtaHomepage = ({ rowData, ...rest }) => {
  // Define rowData info
  const heading = rowData?.heading;
  const subHeading = rowData?.subHeading;

  // Debug
  //console.log("Debug ctaHomepage: ",)

  // Return component
  return (
    <section className="bg-primary" {...rest}>
      {/** MAIN CONTAINER */}
      <div className="container mx-auto flex flex-col items-center justify-center px-6 py-12 space-y-6">
        {/** COL 1 */}
        <div className="flex flex-col items-center justify-center md:max-w-xl">
          {/** Heading */}
          <h2 className={`text-white text-center md:text-4xl`}>{heading}</h2>

          {/** Sub heading */}
          {subHeading && <p className={`max-w-md text-white`}>{subHeading}</p>}

          {/** Button */}
          <div className="mt-6">
            <CtaDownloadApp />
          </div>
        </div>
      </div>
    </section>
  ); // close return
}; // close component

// Export
export default CtaHomepage;
