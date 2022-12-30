// Import resources
import React from "react";
import nookies from "nookies";

// Import custom files
import twStyles from "../src/styles/twStyles";
import { handleVerifyIdToken } from "../src/config/firebaseAdmin";
import { handleAppSettings, handleSiteInfo } from "../src/config/functions";

// Component
const Home = ({ currSession, pageDetails, siteInfo }) => {
  // Debug
  //console.log("Debug home: ", currSession);

  // Return component
  return (
    <div className="text-4xl">
      <p>Heading</p>
    </div>
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
      currSession: session ? session : null,
      pageDetails: pageData,
      siteInfo: siteInfo,
    }, // close props
  }; // close return
}; // close getServerSide
