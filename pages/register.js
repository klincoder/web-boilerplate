// Import resources
import React from "react";
import { getSession } from "next-auth/react";

// Import custom files
import twStyles from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import FormRegister from "../src/components/FormRegister";
import { handleAppSettings, handleSiteInfo } from "../src/config/functions";

// Component
const Register = ({ currSession, pageDetails, siteInfo }) => {
  // Debug
  //console.log("Debug register: ", currSession);

  // Return component
  return (
    <PageContent
      currSession={currSession}
      pageDetails={pageDetails}
      siteInfo={siteInfo}
    >
      {/** SECTION */}
      <section className="bg-white">
        {/** CONTAINER */}
        <div className="container mx-auto flex flex-col items-center px-6 pt-14 pb-24">
          {/** COL 1 - FORM */}
          <div className="flex flex-col p-6 border rounded-lg shadow-lg">
            <h3 className="text-left mb-6">{pageDetails?.title}</h3>
            <FormRegister siteInfo={siteInfo} />
          </div>
        </div>
      </section>
    </PageContent>
  ); // close return
}; // close component

// Export
export default Register;

// GET SEVERSIDE PROPS
// export const getServerSideProps = async (context) => {
//   // Get session
//   const session = await getSession(context);
//   // If session, redirect to homepage
//   if (session) {
//     return {
//       redirect: {
//         destination: `/`,
//         permanent: false,
//       }, // close redirect
//     }; // close return
//   } // close if

//   // Get data
//   const pageData = await handleAppSettings("page_register");
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
