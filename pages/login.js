// Import resources
import React from "react";
import { getCsrfToken, getSession } from "next-auth/react";

// Import custom files
import twStyles from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import FormLogin from "../src/components/FormLogin";
import { handleGetPageDetails } from "../src/config/functions";

// Component
const Login = ({ currSession, pageDetails, csrfToken }) => {
  // Debug
  //console.log("Debug login: ", currSession);

  // Return component
  return (
    <PageContent currSession={currSession} pageDetails={pageDetails}>
      {/** SECTION */}
      <section className="bg-white">
        {/** CONTAINER */}
        <div className="container mx-auto flex flex-col items-center px-6 py-10">
          {/** COL 1 - FORM */}
          <div className="flex flex-col p-6 border rounded-lg shadow-lg">
            {/** Heading */}
            <h3 className="text-left mb-6">{pageDetails?.title}</h3>
            {/** Login form */}
            <FormLogin csrfToken={csrfToken} />
          </div>
        </div>
      </section>
    </PageContent>
  ); // close return
}; // close component

// Export
export default Login;

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
  const pageData = await handleGetPageDetails("login");
  const csrfToken = await getCsrfToken(context);

  // Return props
  return {
    props: {
      currSession: session || null,
      pageDetails: pageData || null,
      csrfToken: csrfToken || null,
    }, // close props
  }; // close return
}; // close getServerSide
