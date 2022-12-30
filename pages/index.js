// Import resources
import React from "react";
import nookies from "nookies";

// Import custom files
import twStyles from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import { handleVerifyIdToken } from "../src/config/firebaseAdmin";
import { handleAppSettings, handleSiteInfo } from "../src/config/functions";
import FormTest from "../src/components/FormTest";

// Component
const Home = ({ currSession, pageDetails, siteInfo }) => {
  // Debug
  //console.log("Debug home: ", currSession);

  // Return component
  return (
    <PageContent
      currSession={currSession}
      pageDetails={pageDetails}
      siteInfo={siteInfo}
    >
      {/** SECTION HERO */}
      {/* <p className="text-4xl">Heading new</p> */}

      {/** FORM */}
      <div className="container mx-auto p-3 my-10 rounded-lg shadow-lg">
        <FormTest />
      </div>
    </PageContent>
  ); // close return
}; // close component

// Export
export default Home;

// GET SEVERSIDE PROPS
export const getServerSideProps = async (context) => {
  // Get session
  const ftoken = nookies.get(context)?.ftoken;
  const session = await handleVerifyIdToken(ftoken);

  // Define data
  const pageData = await handleAppSettings("page_home");
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
