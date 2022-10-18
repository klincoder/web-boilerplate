// Import resources
import React from "react";
import nookies from "nookies";

// Import custom files
import tw from "../../src/styles/twStyles";
import CmsContent from "../../src/components/CmsContent";
import { baseUrl } from "../../src/config/data";
import { handleVerifyIdToken } from "../../src/config/firebaseAdmin";

// Component
const CmsDashboard = ({ currSession }) => {
  // Define page details
  const pageTitle = "Dashboard";

  // Debug
  //console.log("Debug cms: ", );

  // Return component
  return (
    <CmsContent currSession={currSession} title={pageTitle}>
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
