// Import resources
import React from "react";
import nookies from "nookies";

// Import custom files
import twStyles from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import { handleVerifyIdToken } from "../src/config/firebaseAdmin";
import { handleAppSettings, handleSiteInfo } from "../src/config/functions";

// Component
const Contact = ({ currSession, pageDetails, siteInfo }) => {
  // Debug
  //console.log("Debug contact: ", currSession);

  // Return component
  return (
    <PageContent
      currSession={currSession}
      pageDetails={pageDetails}
      siteInfo={siteInfo}
    >
      {/** SECTION */}
      <section className="bg-white">
        <div className="container mx-auto flex flex-col px-6 pt-14 pb-24">
          {/** COL 1 */}
          <div className="flex flex-col p-6 mb-8 rounded shadow-lg">
            <p>{pageDetails?.title}</p>
          </div>
        </div>
      </section>
    </PageContent>
  ); // close return
}; // close component

// Export
export default Contact;

// GET SEVERSIDE PROPS
export const getServerSideProps = async (context) => {
  // Get session
  const ftoken = nookies.get(context)?.ftoken;
  const session = await handleVerifyIdToken(ftoken);
  // Define data
  const pageData = await handleAppSettings("page_contact");
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
