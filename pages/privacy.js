// Import resources
import React from "react";
import { getSession } from "next-auth/react";

// Import custom files
import twStyles from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import CustomDivider from "../src/components/CustomDivider";
import {
  handleGetPageDetails,
  handleHtmlParser,
} from "../src/config/functions";

// Component
const Privacy = ({ currSession, pageDetails }) => {
  // Define variables
  const pageTitle = pageDetails?.title;
  const pageContent = handleHtmlParser(pageDetails?.content);

  // Debug
  //console.log("Debug privacy: ", currSession);

  // Return component
  return (
    <PageContent currSession={currSession} pageDetails={pageDetails}>
      {/** SECTION */}
      <section className="bg-white">
        {/** ROW */}
        <div className="container mx-auto flex flex-col px-6 py-24">
          {/** COL 1 */}
          <div className="flex flex-col p-6 mb-8 border rounded-lg shadow-lg">
            {/** Title */}
            <h3>{pageTitle}</h3>

            {/** Divider */}
            <CustomDivider styleDivider="mt-2 mb-6" />

            {/** Content */}
            <div>{pageContent}</div>
          </div>
        </div>
      </section>
    </PageContent>
  ); // close return
}; // close component

// Export
export default Privacy;

// GET SEVERSIDE PROPS
export const getServerSideProps = async (context) => {
  // Get session
  const session = await getSession(context);

  // Get data
  const pageData = await handleGetPageDetails("privacy");

  // Return props
  return {
    props: {
      currSession: session?.user || null,
      pageDetails: pageData || null,
    }, // close props
  }; // close return
}; // close getServerSide
