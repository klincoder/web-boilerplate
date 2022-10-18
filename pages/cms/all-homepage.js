// Import resources
import React from "react";
import nookies from "nookies";

// Import custom files
import tw from "../../src/styles/twStyles";
import CmsContent from "../../src/components/CmsContent";
import FormAllHomepage from "../../src/components/FormAllHomepage";
import useAppSettings from "../../src/hooks/useAppSettings";
import CustomButton from "../../src/components/CustomButton";
import { appImages, baseUrl } from "../../src/config/data";
import { handleVerifyIdToken } from "../../src/config/firebaseAdmin";

// Component
const AllHomepage = ({ currSession }) => {
  // Define page details
  const pageTitle = "All Homepage";

  // Define app settings
  const { pageHome } = useAppSettings();

  // Debug
  //console.log("Debug allHomepage: ", pageHome);

  // Return component
  return (
    <CmsContent currSession={currSession} title={pageTitle} pageAccess="admin">
      {/** MAIN CONTAINER */}
      <div className="flex flex-col mb-6">
        {/** COL 1 - HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h4>{pageTitle}</h4>
        </div>

        {/** COL 2 - BODY */}
        <div className="flex flex-col mb-6">
          <FormAllHomepage rowData={pageHome} />
        </div>
      </div>
    </CmsContent>
  ); // close return
}; // close component

// Export
export default AllHomepage;

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
