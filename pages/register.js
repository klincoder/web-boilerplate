// Import resources
import React from "react";
import { getSession } from "next-auth/react";

// Import custom files
import twStyles from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import FormRegister from "../src/components/FormRegister";
import { handleGetPageDetails } from "../src/config/functions";

// Component
const Register = ({ currSession, pageDetails }) => {
  // Debug
  //console.log("Debug register: ", currSession);

  // Return component
  return (
    <PageContent currSession={currSession} pageDetails={pageDetails}>
      {/** SECTION */}
      <section className="bg-white">
        {/** ROW */}
        <div className="container mx-auto flex flex-col items-center px-6 py-24">
          {/** COL 1 - FORM */}
          <div className="flex flex-col p-6 mb-8 w-full border rounded-lg shadow-lg md:w-1/2">
            {/** Heading */}
            <h3 className="text-left mb-6">{pageDetails?.title}</h3>
            {/** Register form */}
            <FormRegister />
          </div>
        </div>
      </section>
    </PageContent>
  ); // close return
}; // close component

// Export
export default Register;

// GET SEVERSIDE PROPS
export const getServerSideProps = async (context) => {
  // Get session
  const session = await getSession(context);
  // If session, redirect to homepage
  if (session) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      }, // close redirect
    }; // close return
  } // close if

  // Get data
  const pageData = await handleGetPageDetails("register");

  // Return props
  return {
    props: {
      currSession: session || null,
      pageDetails: pageData || null,
    }, // close props
  }; // close return
}; // close getServerSide
