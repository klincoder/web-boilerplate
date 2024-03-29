// Import resources
import React from "react";
import { getSession } from "next-auth/react";

// Import custom files
import twStyles from "../../src/styles/twStyles";
import PageContent from "../../src/components/PageContent";
import useAppSettings from "../../src/hooks/useAppSettings";

// Component
const Cms = ({ currSession }) => {
  // Define app settings
  const { isMounted } = useAppSettings();

  // Define variables
  const pageTitle = "Dashboard";

  // Debug
  //console.log("Debug cms: ", currSession);

  // Return component
  return (
    <PageContent isCms currSession={currSession} title={pageTitle}>
      {/** HEADING */}
      <div className="flex items-center justify-between mb-3">
        <h4>{pageTitle}</h4>
      </div>

      {/** SECTION - 1 */}
      <section className="mb-10">
        {/** ROW */}
        <div className="flex flex-col space-x-0 space-y-5 md:flex-row md:space-x-5 md:space-y-0">
          {/** COL 1 */}
          <div className="flex flex-col p-6 w-full border shadow rounded-lg bg-white md:w-1/2">
            <p>Content goes here...</p>
          </div>

          {/** COL 2 */}
          <div className="flex flex-col p-6 w-full border shadow rounded-lg bg-white md:w-1/2">
            <p>Content goes here...</p>
          </div>
        </div>
      </section>

      {/** SECTION - 2 */}
      <section className="bg-white mb-10 border shadow rounded-lg">
        {/** ROW */}
        <div className="flex flex-col space-x-0 space-y-5 md:flex-row md:space-x-5 md:space-y-0">
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
export default Cms;

// GET SEVERSIDE PROPS
export const getServerSideProps = async (context) => {
  // Get session
  const session = await getSession(context);
  // If no session, redirect
  if (!session) {
    return {
      redirect: {
        destination: `/login?callbackUrl=/cms`,
        permanent: false,
      }, // close redirect
    }; // close return
  } // close if !session

  // Return props
  return {
    props: {
      currSession: session?.user || null,
    }, // close props
  }; // close return
}; // close getServerSide
