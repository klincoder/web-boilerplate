// Import resources
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
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
import { handleGetInfoById } from "../../src/config/functions";

// Component
function AllBlogCreate({ currSession }) {
  // Define state
  const [pageTitle, setPageTitle] = useState("");
  const myPosts = useRecoilValue(userBlogAtom);

  // Define router
  const router = useRouter();
  const rowID = router.query?.id;
  const rowData = handleGetInfoById(myPosts, rowID);

  // Debug
  //console.log("Debug AllBlogcreate: ", { rowID, rowData});

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
} // close component

// Export
export default AllBlogCreate;

// GET SEVER SIDE PROPS
export const getServerSideProps = async (context) => {
  // Get session
  const session = await getSession(context);
  // If no session, redirect
  if (!session) {
    return {
      redirect: {
        destination: `/login?callbackUrl=${baseUrl}/cms`,
        permanent: false,
      }, // close redirect
    }; // close return
  } // close if !session

  // Return props
  return {
    props: {
      currSession: session ? session?.user : null,
    }, // close props
  }; // close return
}; // close getServerSide
