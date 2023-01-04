// Import resources
import React from "react";
import { getSession } from "next-auth/react";
import { AiOutlinePlus } from "react-icons/ai";

// Import custom files
import twStyles from "../../src/styles/twStyles";
import PageContent from "../../src/components/PageContent";
import useAppSettings from "../../src/hooks/useAppSettings";
import CustomButton from "../../src/components/CustomButton";

// Component
const BlankPageCms = ({ currSession }) => {
  // Define app settings
  const { isMounted } = useAppSettings();

  // Define variables
  const pageTitle = "BlankPageCms";

  // Debug
  //console.log("Debug blankPageCms: ");

  // Return component
  return (
    <PageContent isCms currSession={currSession} title={pageTitle}>
      {/** HEADING */}
      <div className="flex flex-row items-center justify-between mb-10">
        <h4>{pageTitle}</h4>
        <CustomButton
          isLink
          href="/all-pages?action=create"
          styleBtn={twStyles?.btnTextPrimary}
        >
          <AiOutlinePlus size={24} />
        </CustomButton>
      </div>

      {/** SECTION */}
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
export default BlankPageCms;

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
