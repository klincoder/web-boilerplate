// Import resources
import React from "react";

// Import custom files
import twStyles from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import CustomAlertMsg from "../src/components/CustomAlertMsg";

// Component
const PageError = () => {
  // Define variables
  const pageTitle = "Page Error";

  // Debug
  //console.log("Debug pageError: ", currSession);

  // Return component
  return (
    <PageContent title={pageTitle}>
      {/** SECTION */}
      <section className="bg-white">
        <div className="container mx-auto flex flex-col px-6 pt-14 pb-24">
          {/** COL 1 */}
          <div className="flex flex-col p-6 mb-8 rounded shadow-lg">
            {/** Alert msg */}
            <CustomAlertMsg isIcon type="error" title={pageTitle} />
          </div>
        </div>
      </section>
    </PageContent>
  ); // close return
}; // close component

// Export
export default PageError;
