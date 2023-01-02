// Import resources
import React from "react";
import { getSession } from "next-auth/react";

// Import custom files
import twStyles from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import CustomDivider from "../src/components/CustomDivider";
import {
  handleAppSettings,
  handleHtmlParser,
  handleSiteInfo,
} from "../src/config/functions";

// Component
const Terms = ({ currSession, pageDetails, siteInfo }) => {
  // Define variables
  const pageTitle = pageDetails?.title;
  const pageContent = handleHtmlParser(pageDetails?.content);

  // Debug
  //console.log("Debug terms: ", currSession);

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
export default Terms;

// GET SEVERSIDE PROPS
// export const getServerSideProps = async (context) => {
//   // Get session
//   const session = await getSession(context);

//   // Get data
//   const pageData = await handleAppSettings("page_terms");
//   const siteInfo = await handleSiteInfo();

//   // Return props
//   return {
//     props: {
//       currSession: session || null,
//       pageDetails: pageData || null,
//       siteInfo: siteInfo || null,
//     }, // close props
//   }; // close return
// }; // close getServerSide
