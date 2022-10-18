// Import resources
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRecoilValue } from "recoil";
import nookies from "nookies";

// Import custom files
import tw from "../../src/styles/twStyles";
import CmsContent from "../../src/components/CmsContent";
import useAppSettings from "../../src/hooks/useAppSettings";
import CustomButton from "../../src/components/CustomButton";
import FormAllFaqsCreate from "../../src/components/FormAllFaqsCreate";
import { allFaqsAtom } from "../../src/recoil/atoms";
import { handleGetInfoById } from "../../src/config/functions";
import { handleVerifyIdToken } from "../../src/config/firebaseAdmin";

// Component
const AllFaqsCreate = ({ currSession }) => {
  // Define state
  const [pageTitle, setPageTitle] = useState("");
  const allFaqs = useRecoilValue(allFaqsAtom);

  // Define app settings
  const { routerQuery } = useAppSettings();

  // Define row info
  const rowID = routerQuery?.id;
  const rowData = handleGetInfoById(allFaqs, rowID);

  // Debug
  //console.log("Debug allFaqsCreate: ", currSession);

  // SIDE EFFECTS
  // LISTEN TO PAGE TITLE
  useEffect(() => {
    // If rowID
    if (rowID) {
      setPageTitle("Edit FAQ");
    } else {
      setPageTitle("Create FAQ");
    } // close if
  }, [rowID]);

  // Return component
  return (
    <CmsContent currSession={currSession} title={pageTitle} pageAccess="admin">
      {/** MAIN CONTAINER */}
      <div className="flex flex-col mb-6">
        {/** COL 1 - HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h4>{pageTitle}</h4>
          <CustomButton isLink href="/cms/all-faqs">
            <a className={`flex flex-row items-center ${tw?.btnLink}`}>
              <AiOutlineArrowLeft size={20} /> Go Back
            </a>
          </CustomButton>
        </div>

        {/** COL 2 - FORM */}
        <div className="flex flex-col mb-6">
          <FormAllFaqsCreate rowData={rowData} />
        </div>
      </div>
    </CmsContent>
  ); // close return
}; // close component

// Export
export default AllFaqsCreate;

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
