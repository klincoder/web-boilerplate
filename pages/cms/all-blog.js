// Import resources
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import nookies from "nookies";

// Import custom files
import tw from "../../src/styles/twStyles";
import CmsContent from "../../src/components/CmsContent";
import CustomButton from "../../src/components/CustomButton";
import useAppSettings from "../../src/hooks/useAppSettings";
import TableAllBlog from "../../src/components/TableAllBlog";
import FormAllBlog from "../../src/components/FormAllBlog";
import { baseUrl } from "../../src/config/data";
import { handleVerifyIdToken } from "../../src/config/firebaseAdmin";

// Component
const AllBlog = () => {
  // Define page details
  const pageTitle = "All Blog";

  // Define app settings
  const { pageBlog } = useAppSettings();

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
          <CustomButton isLink href="/cms/all-blog-create">
            <a className={`text-white ${tw?.btnTextPrimary}`}>
              <AiOutlinePlus size={24} />
            </a>
          </CustomButton>
        </div>

        {/** COL 2 - TABLE */}
        <div className="flex flex-col mb-6">
          <TableAllBlog />
        </div>

        {/** COL 3 - FORM */}
        <div className="flex flex-col mb-6">
          <FormAllBlog rowData={pageBlog} />
        </div>
      </div>
    </CmsContent>
  ); // close return
}; // close component

// Export
export default AllBlog;

// GET SEVERSIDE PROPS
export const getServerSideProps = async (context) => {
  // Get session
  const ftoken = nookies.get(context)?.ftoken;
  const session = await handleVerifyIdToken(ftoken);
  // If no session, redirect
  if (!session) {
    return {
      redirect: {
        destination: `/login?callbackUrl=/cms`,
        permanent: false,
      }, // close redirect
    }; // close return
  } // close if !session

  // Return props
  return {
    props: {
      currSession: session ? session : null,
    }, // close props
  }; // close return
}; // close getServerSide
