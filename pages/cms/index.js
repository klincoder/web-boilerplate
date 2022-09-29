// Import resources
import React from "react";

// Import custom files
import tw from "../../src/styles/twStyles";
import CmsContent from "../../src/components/CmsContent";
import { baseUrl } from "../../src/config/data";

// Component
const CmsDashboard = () => {
  // Define page details
  const pageTitle = "Dashboard";

  // Debug
  //console.log("Debug cms: ", );

  // Return component
  return (
    <CmsContent title={pageTitle}>
      {/** MAIN CONTAINER */}
      <div className="flex flex-col mb-6">
        {/** COL 1 - HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h4>{pageTitle}</h4>
        </div>

        {/** COL 2 - BODY */}
        <div className="flex flex-col p-4 mb-6 rounded-lg bg-white">
          {/** Content */}
          <p>Content goes here...</p>
        </div>
      </div>
    </CmsContent>
  ); // close return
}; // close component

// Export
export default CmsDashboard;
