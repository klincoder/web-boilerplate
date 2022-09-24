// Import resources
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

// Import custom files
import tw from "../../src/styles/twStyles";
import CmsContent from "../../src/components/CmsContent";
import CustomButton from "../../src/components/CustomButton";
import TableAllBlog from "../../src/components/TableAllBlog";
import { baseUrl } from "../../src/config/data";

// Component
const AllBlog = () => {
  // Define page details
  const pageTitle = "All Blog";

  // Debug
  //console.log("Debug allBlog: ", currSession?.user);

  // Return component
  return (
    <CmsContent title={pageTitle}>
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
        <div className="flex flex-col mb-6">
          {/** Table */}
          <TableAllBlog />
        </div>
      </div>
    </CmsContent>
  ); // close return
}; // close component

// Export
export default AllBlog;
