// Import resources
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import nookies from "nookies";

// Import custom files
import tw from "../../src/styles/twStyles";
import CmsContent from "../../src/components/CmsContent";
import TableAllContact from "../../src/components/TableAllContact";
import useAppSettings from "../../src/hooks/useAppSettings";
import FormAllContact from "../../src/components/FormAllContact";
import { handleVerifyIdToken } from "../../src/config/firebaseAdmin";

// Component
const AllContactForm = ({ currSession }) => {
  // Define page details
  const pageTitle = "All Contact";

  // Define app settings
  const { pageContact } = useAppSettings();

  // Debug
  //console.log("Debug allContactForm: ", allContactList);

  // Return component
  return (
    <CmsContent currSession={currSession} title={pageTitle} pageAccess="admin">
      {/** MAIN CONTAINER */}
      <div className="flex flex-col mb-6">
        {/** COL 1 - HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h4>{pageTitle}</h4>
          {/* <CustomButton isLink href="/all-contact-create">
            <a className={`text-white ${tw?.btnTextPrimary}`}>
              <AiOutlinePlus size={24} />
            </a>
          </CustomButton> */}
        </div>

        {/** COL 2 - TABLE */}
        <div className="flex flex-col mb-8">
          <TableAllContact />
        </div>

        {/** COL 2 - BODY */}
        <div className="flex flex-col mb-6">
          <FormAllContact rowData={pageContact} />
        </div>
      </div>
    </CmsContent>
  ); // close return
}; // close component

// Export
export default AllContactForm;

// GET SEVERSIDE PROPS
export const getServerSideProps = async (context) => {
  // Get session
  const ftoken = nookies.get(context)?.ftoken;
  const session = await handleVerifyIdToken(ftoken);
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
      currSession: session ? session : null,
    }, // close props
  }; // close return
}; // close getServerSide
