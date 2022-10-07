// Import resources
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { AiOutlineArrowLeft } from "react-icons/ai";

// Import custom files
import tw from "../../src/styles/twStyles";
import CmsContent from "../../src/components/CmsContent";
import CustomButton from "../../src/components/CustomButton";
import PostEditor from "../../src/components/PostEditor";
import useAppSettings from "../../src/hooks/useAppSettings";
import { userBlogAtom } from "../../src/recoil/atoms";
import { handleGetInfoById } from "../../src/config/functions";

// Component
const AllBlogCreate = () => {
  // Define state
  const [pageTitle, setPageTitle] = useState("");
  const myPosts = useRecoilValue(userBlogAtom);

  // Define app settings
  const { routerQuery } = useAppSettings();

  // Define row info
  const rowID = routerQuery?.id;
  const rowData = handleGetInfoById(myPosts, rowID);

  // Debug
  //console.log("Debug allBlogcreate: ", { rowID, rowData});

  // SIDE EFFECTS
  // LISTEN TO PAGE TITLE
  useEffect(() => {
    // If rowID
    if (rowID) {
      setPageTitle("Edit Post");
    } else {
      setPageTitle("Create Post");
    } // close if
  }, [rowID]);

  // Return component
  return (
    <CmsContent title={pageTitle}>
      {/** MAIN CONTAINER */}
      <div className="mb-6">
        {/** COL 1 - HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h4>{pageTitle}</h4>
          <CustomButton isLink href="/cms/all-blog">
            <a className={`flex flex-row items-center ${tw?.btnLink}`}>
              <AiOutlineArrowLeft size={20} /> Go Back
            </a>
          </CustomButton>
        </div>

        {/** COL 2 - BODY */}
        <div className="flex flex-col mb-6">
          {/** Post editor */}
          <PostEditor rowData={rowData} />
        </div>
      </div>
      {/* </VerifyPageAccess> */}
    </CmsContent>
  ); // close return
}; // close component

// Export
export default AllBlogCreate;
