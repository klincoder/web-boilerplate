// Import resources
import React from "react";
import nookies from "nookies";

// Import custom files
import twStyles from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import FormPasswordRecovery from "../src/components/FormPasswordRecovery";
import { handleVerifyIdToken } from "../src/config/firebaseAdmin";
import { handleAppSettings, handleSiteInfo } from "../src/config/functions";

// Component
const PasswordRecovery = ({ currSession, pageDetails, siteInfo }) => {
  // Debug
  //console.log("Debug passwordRecovery: ", currSession);

  // Return component
  return (
    <PageContent
      currSession={currSession}
      pageDetails={pageDetails}
      siteInfo={siteInfo}
    >
      {/** SECTION */}
      <section className="bg-white">
        {/** CONTAINER */}
        <div className="container mx-auto flex flex-col items-center px-6 pt-14 pb-24">
          {/** COL 1 - FORM */}
          <div className="flex flex-col px-10 py-6 border rounded-lg shadow-lg">
            <h3 className="text-left mb-6">{pageDetails?.title}</h3>
            <FormPasswordRecovery />
          </div>
        </div>
      </section>
    </PageContent>
  ); // close return
}; // close component

// Export
export default PasswordRecovery;

// GET SEVERSIDE PROPS
export const getServerSideProps = async (context) => {
  // Get session
  const ftoken = nookies.get(context)?.ftoken;
  const session = await handleVerifyIdToken(ftoken);

  // Define data
  const pageData = await handleAppSettings("page_password_recovery");
  const siteInfo = await handleSiteInfo();

  // Return props
  return {
    props: {
      currSession: session || null,
      pageDetails: pageData || null,
      siteInfo: siteInfo || null,
    }, // close props
  }; // close return
}; // close getServerSide
