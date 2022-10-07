// Import resources
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

// Import custom files
import tw from "../../src/styles/twStyles";
import CmsContent from "../../src/components/CmsContent";
import CustomButton from "../../src/components/CustomButton";
import { appImages, baseUrl } from "../../src/config/data";

// Component
const AllTerms = () => {
  // Define page details
  const pageTitle = "All Terms";

  // Debug
  //console.log("Debug allTerms: ",)

  // Return component
  return (
    <CmsContent title={pageTitle} pageAccess="admin">
      {/** MAIN CONTAINER */}
      <div className="flex flex-col mb-6">
        {/** COL 1 - HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h4>{pageTitle}</h4>
          <CustomButton isLink href="/cms">
            <a className={`text-white ${tw?.btnTextPrimary}`}>
              <AiOutlinePlus size={24} />
            </a>
          </CustomButton>
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
export default AllTerms;
