// Import resources
import React from "react";
import { getSession } from "next-auth/react";

// Import custom files
import twStyles from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import useAuthState from "../src/hooks/useAuthState";
import useAppSettings from "../src/hooks/useAppSettings";
import { handleGetPageDetails } from "../src/config/functions";

// Component
const Home = ({ currSession, pageDetails }) => {
  // Define app settings
  const { siteInfo } = useAppSettings();

  // Define state
  const { user } = useAuthState();

  // Debug
  //console.log("Debug home: ", appSettings);

  // Return component
  return (
    <PageContent currSession={currSession} pageDetails={pageDetails}>
      {/** SECTION HERO */}
    </PageContent>
  ); // close return
}; // close component

// Export
export default Home;

// GET SEVERSIDE PROPS
export const getServerSideProps = async (context) => {
  // Get session
  const session = await getSession(context);

  // Get data
  const pageData = await handleGetPageDetails("home");

  // Return props
  return {
    props: {
      currSession: session?.user || null,
      pageDetails: pageData || null,
    }, // close props
  }; // close return
}; // close getServerSide
