// Import resources
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

// Import custom files
import twStyles from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import CustomAlertMsg from "../src/components/CustomAlertMsg";
import CustomChip from "../src/components/CustomChip";
import useAppSettings from "../src/hooks/useAppSettings";

// Component
const PageError = () => {
  // Define app settings
  const { router } = useAppSettings();

  // Define variables
  const pageTitle = "Page Error";
  const pageDesc = "Sorry... we couldn't find this page.";

  // Debug
  //console.log("Debug pageError: ", currSession);

  // Return component
  return (
    <PageContent title={pageTitle}>
      {/** SECTION */}
      <section className="bg-white">
        {/** ROW */}
        <div className="container mx-auto flex flex-col items-center px-6 py-24">
          {/** COL 1 - FORM */}
          <div className="flex flex-col p-6 mb-8 w-full border rounded-lg shadow-lg md:w-1/2">
            {/** Alert msg */}
            <CustomAlertMsg
              isIcon
              type="error"
              title={pageTitle}
              description={pageDesc}
              actions={
                <div className="flex flex-row items-center">
                  <CustomChip
                    title="Back to Home"
                    onClick={() => router.push("/")}
                  />
                </div>
              }
            />
          </div>
        </div>
      </section>
    </PageContent>
  ); // close return
}; // close component

// Export
export default PageError;
