// Import resources
import React from "react";

// Import custom files
import tw from "../../src/styles/twStyles";
import CmsContent from "../../src/components/CmsContent";
import LibraryShowcase from "../../src/components/LibraryShowcase";
import { appImages, baseUrl } from "../../src/config/data";

// Component
const AllLibrary = () => {
  // Define page details
  const pageTitle = "All Library";

  // Debug
  //console.log("Debug allLibrary: ");

  // Return component
  return (
    <CmsContent title={pageTitle} pageAccess="admin">
      {/** MAIN CONTAINER */}
      <div className="flex flex-col mb-6">
        {/** COL 1 - HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h4>{pageTitle}</h4>
        </div>

        {/** COL 2 - BODY */}
        <div className="flex flex-col mb-6">
          {/** Library showcase */}
          <LibraryShowcase />
        </div>
      </div>
    </CmsContent>
  ); // close return
}; // close component

// Export
export default AllLibrary;
