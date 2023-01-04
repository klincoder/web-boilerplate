// Import resources
import React from "react";
import { getSession } from "next-auth/react";

// Import custom files
import twStyles from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import useAppSettings from "../src/hooks/useAppSettings";
import useAuthState from "../src/hooks/useAuthState";
import { handleGetPageDetails } from "../src/config/functions";

// Component
const BlankPage = ({ currSession, pageDetails }) => {
  // Define app settings
  const { isMounted } = useAppSettings();

  // Define state
  const { user } = useAuthState();

  // Debug
  //console.log("Debug blankPage: ", currSession);

  // Return component
  return (
    <PageContent currSession={currSession} pageDetails={pageDetails}>
      {/** SECTION */}
      <section className="bg-white mb-10 border shadow rounded-lg">
        {/** ROW */}
        <div className="container mx-auto flex flex-col space-x-0 space-y-5 md:flex-row md:space-x-5 md:space-y-0">
          {/** COL 1 */}
          <div className="flex flex-col p-6 w-full md:w-1/2">
            <p>Col 1</p>
          </div>

          {/** COL 2 */}
          <div className="flex flex-col p-6 w-full md:w-1/2">
            <p>Col 2</p>
          </div>
        </div>
      </section>
    </PageContent>
  ); // close return
}; // close component

// Export
export default BlankPage;

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
