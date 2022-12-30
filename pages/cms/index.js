// Import resources
import React from "react";
import nookies from "nookies";

// Import custom files
import twStyles from "../../src/styles/twStyles";
import PageContent from "../../src/components/PageContent";
import { handleVerifyIdToken } from "../../src/config/firebaseAdmin";
import { handleSiteInfo } from "../../src/config/functions";

// Component
const Cms = ({ currSession, siteInfo }) => {
  // Define variables
  const pageTitle = "Dashboard";

  // Debug
  //console.log("Debug Cms: ");

  // Return component
  return (
    <PageContent
      isCms
      currSession={currSession}
      title={pageTitle}
      siteInfo={siteInfo}
    >
      {/** SECTION HERO */}
      {/* <p className="text-4xl">Heading new</p> */}
    </PageContent>
  ); // close return
}; // close component

// Export
export default Cms;

// GET SEVERSIDE PROPS
export const getServerSideProps = async (context) => {
  // Get session
  const ftoken = nookies.get(context)?.ftoken;
  const session = await handleVerifyIdToken(ftoken);

  // Get data
  const siteInfo = await handleSiteInfo();

  // // If no session, redirect
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: `/login?callbackUrl=/cms`,
  //       permanent: false,
  //     }, // close redirect
  //   }; // close return
  // } // close if !session

  // Return props
  return {
    props: {
      currSession: session || null,
      siteInfo: siteInfo || null,
    }, // close props
  }; // close return
}; // close getServerSide
