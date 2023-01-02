// Import resources
import React from "react";
import { getSession } from "next-auth/react";

// Import custom files
import twStyles from "../../src/styles/twStyles";
import PageContent from "../../src/components/PageContent";
import { handleSiteInfo } from "../../src/config/functions";

// Component
const Settings = ({ currSession, siteInfo }) => {
  // Define variables
  const pageTitle = "Settings";

  // Debug
  //console.log("Debug settings: ");

  // Return component
  return (
    <PageContent
      isCms
      currSession={currSession}
      title={pageTitle}
      siteInfo={siteInfo}
    >
      {/** HEADING */}
      <div className="flex items-center justify-between mb-3">
        <h4>{pageTitle}</h4>
      </div>

      {/** SECTION */}
      <section className="bg-white p-4 mb-10 rounded-lg">
        <div className="flex flex-col mb-6">
          <p>Content goes here...</p>
        </div>
      </section>
    </PageContent>
  ); // close return
}; // close component

// Export
export default Settings;

// GET SEVERSIDE PROPS
// export const getServerSideProps = async (context) => {
//   // Get session
//   const session = await getSession(context);
//   // If no session, redirect
//   if (!session) {
//     return {
//       redirect: {
//         destination: `/login?callbackUrl=/cms`,
//         permanent: false,
//       }, // close redirect
//     }; // close return
//   } // close if !session

//   // Get data
//   const siteInfo = await handleSiteInfo();

//   // Return props
//   return {
//     props: {
//       currSession: session || null,
//       siteInfo: siteInfo || null,
//     }, // close props
//   }; // close return
// }; // close getServerSide
