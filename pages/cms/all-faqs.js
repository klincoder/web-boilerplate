// Import resources
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import nookies from "nookies";

// Import custom files
import tw from "../../src/styles/twStyles";
import CmsContent from "../../src/components/CmsContent";
import useAppSettings from "../../src/hooks/useAppSettings";
import CustomButton from "../../src/components/CustomButton";
import FormAllFaqs from "../../src/components/FormAllFaqs";
import TableAllFaqs from "../../src/components/TableAllFaqs";
import { appImages, baseUrl } from "../../src/config/data";
import { handleVerifyIdToken } from "../../src/config/firebaseAdmin";

// Component
const AllFaqs = ({ currSession }) => {
  // Define page details
  const pageTitle = "All FAQs";

  // Define app settings
  const { pageFaqs } = useAppSettings();

  // Debug
  //console.log("Debug allFaqs: ",)

  // Return component
  return (
    <CmsContent currSession={currSession} title={pageTitle} pageAccess="admin">
      {/** MAIN CONTAINER */}
      <div className="flex flex-col mb-3">
        {/** COL 1 - HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h4>{pageTitle}</h4>
          <CustomButton isLink href="/cms/all-faqs-create">
            <a className={`text-white ${tw?.btnTextPrimary}`}>
              <AiOutlinePlus size={24} />
            </a>
          </CustomButton>
        </div>

        {/** COL 2 - TABLE */}
        <div className="flex flex-col mb-8">
          <TableAllFaqs />
        </div>

        {/** COL 3 - FORM */}
        <div className="flex flex-col mb-8">
          <FormAllFaqs rowData={pageFaqs} />
        </div>
      </div>
    </CmsContent>
  ); // close return
}; // close component

// Export
export default AllFaqs;

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
