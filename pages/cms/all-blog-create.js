// Import resources
import React from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";

// Import custom files
import tw from "../../src/styles/twStyles";
import CmsContent from "../../src/components/CmsContent";
import CustomButton from "../../src/components/CustomButton";
import PostEditor from "../../src/components/PostEditor";
import { appImages, baseUrl } from "../../src/config/data";
import { userBlogAtom } from "../../src/recoil/atoms";
import { handleGetPostInfo } from "../../src/config/functions";

// Component
const AllBlogCreate = () => {
  // Define page details
  const pageTitle = "Create Post";

  // Define atom
  const myPosts = useRecoilValue(userBlogAtom);
  const myPostsLen = myPosts?.length;

  // Define router
  const router = useRouter();
  const rowID = router.query?.id;
  const rowData = handleGetPostInfo(myPosts, rowID);

  // Debug
  //console.log("Debug AllBlogcreate: ", { rowID, rowData});

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
    </CmsContent>
  ); // close return
}; // close component

// Export
export default AllBlogCreate;
