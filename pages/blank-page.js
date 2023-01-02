// Import resources
import React from "react";
import { getSession } from "next-auth/react";

// Import custom files
import twStyles from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import useAppSettings from "../src/hooks/useAppSettings";
import useAuthState from "../src/hooks/useAuthState";
import { handleAppSettings, handleSiteInfo } from "../src/config/functions";

// Component
const BlankPage = ({ currSession, pageDetails, siteInfo }) => {
  // Define app settings
  const { isMounted } = useAppSettings();

  // Define state
  const { handleEmailExist } = useAuthState();

  // Debug
  //console.log("Debug blankPage: ", currSession);

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
export default BlankPage;

// GET SEVERSIDE PROPS
// export const getServerSideProps = async (context) => {
//   // Get session
//   const session = await getSession(context);

//   // Get data
//   const pageData = await handleAppSettings("page_home");
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
