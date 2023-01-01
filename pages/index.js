// Import resources
import React from "react";
import nookies from "nookies";

// Import custom files
import twStyles from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import CustomButton from "../src/components/CustomButton";
import FormTest from "../src/components/FormTest";
import { apiRoutes } from "../src/config/data";
import { handleVerifyIdToken } from "../src/config/firebaseAdmin";
import {
  handleAppSettings,
  handleSendVerifyLink,
  handleSiteInfo,
} from "../src/config/functions";

// Component
const Home = ({ currSession, pageDetails, siteInfo }) => {
  // Debug
  //console.log("Debug home: ",);

  // Return component
  return (
    <PageContent
      currSession={currSession}
      pageDetails={pageDetails}
      siteInfo={siteInfo}
    >
      {/** SECTION HERO */}
      {/** TEST */}
      {/* <div className="container mx-auto p-3 my-10 rounded-lg shadow-lg">
        <CustomButton
          isNormal
          onClick={async () => {
            const result = await handleSendVerifyLink(
              "chinaemeremtech",
              "chinaemeremtech@gmail.com",
              apiRoutes?.verifyEmail,
              siteInfo?.name
            );
            console.log("Debug testBtn: ", result?.data);
          }}
        >
          TEST BUTTON
        </CustomButton>
      </div> */}
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
