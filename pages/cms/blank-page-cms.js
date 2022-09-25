// Import resources
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

// Import custom files
import tw from "../../src/styles/twStyles";
import CmsContent from "../../src/components/CmsContent";
import CustomButton from "../../src/components/CustomButton";
import { appImages, baseUrl } from "../../src/config/data";

// Component
const BlankPageCms = () => {
  // Define page details
  const pageTitle = "BlankPageCms";

  // Debug
  //console.log("Debug blankPageCms: ",)

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
        <div className="flex flex-col mb-6">
          {/** Content */}
          <p>Content goes here...</p>
        </div>
      </div>
    </CmsContent>
  ); // close return
}; // close component

// Export
export default BlankPageCms;

// GET SEVERSIDE PROPS
// export const getServerSideProps = async (context) => {
//   // FETCH DATA
//   // Get page details

//   // Return props
//   return {
//     props: {
//       //pageDetails: null,
//     }, // close props
//   }; // close return
// } // close getServerSide