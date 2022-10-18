// Import resources
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import nookies from "nookies";

// Import custom files
import tw from "../../src/styles/twStyles";
import CmsContent from "../../src/components/CmsContent";
import TableAllUsers from "../../src/components/TableAllUsers";
import CustomButton from "../../src/components/CustomButton";
import { appImages, baseUrl } from "../../src/config/data";
import { handleVerifyIdToken } from "../../src/config/firebaseAdmin";

// Component
const AllUsers = ({ currSession }) => {
  // Define page details
  const pageTitle = "All Users";

  // Debug
  //console.log("Debug allUsers: ",)

  // Return component
  return (
    <CmsContent currSession={currSession} title={pageTitle} pageAccess="admin">
      {/** MAIN CONTAINER */}
      <div className="flex flex-col mb-6">
        {/** COL 1 - HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h4>{pageTitle}</h4>
          {/* <CustomButton isLink href="/cms">
            <a className={`text-white ${tw?.btnTextPrimary}`}>
              <AiOutlinePlus size={24} />
            </a>
          </CustomButton> */}
        </div>

        {/** COL 2 - TABLE */}
        <div className="flex flex-col mb-6">
          <TableAllUsers />
        </div>
      </div>
    </CmsContent>
  ); // close return
}; // close component

// Export
export default AllUsers;

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
