// Import resources
import React from "react";

// Import custom files
import tw from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import CustomAlertMsg from "../src/components/CustomAlertMsg";
import { appImages } from "../src/config/data";

// Component
const PageError = () => {
  // Define page details
  const pageTitle = "Page Error";

  // Debug
  //console.log("Debug pageError: ",)

  // Return component
  return (
    <PageContent title={pageTitle}>
      {/** SECTION - PAGE DETAILS */}
      <section className="bg-white">
        {/** MAIN CONTAINER */}
        <div className="container mx-auto flex flex-col items-center px-4 pt-14 py-40">
          {/** Alert msg */}
          <CustomAlertMsg showBtn />
        </div>
      </section>
    </PageContent>
  ); // close return
}; // close component

// Export
export default PageError;
