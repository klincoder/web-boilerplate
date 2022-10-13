// Import resources
import React from "react";
import nookies from "nookies";

// Import custom files
import tw from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import FormLogin from "../src/components/FormLogin";
import CustomCard from "../src/components/CustomCard";
import { handleVerifyIdToken } from "../src/config/firebaseAdmin";

// Component
const Login = () => {
  // Define page details
  const pageTitle = "Login";

  // Debug
  //console.log("Debug login: ", routerHistory);

  // Return component
  return (
    <PageContent title={pageTitle}>
      {/** SECTION - PAGE DETAILS */}
      <section className="bg-white">
        {/** CONTAINER */}
        <div className="container mx-auto flex flex-row items-center justify-center px-4 pt-14 pb-24 w-full md:space-y-0">
          {/** COL 1 - CARD */}
          <CustomCard isNormal title="Login">
            {/** Form */}
            <FormLogin />
          </CustomCard>
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
  const ftoken = nookies.get(context)?.ftoken;
  const session = await handleVerifyIdToken(ftoken);
  // If no session, redirect
  if (session) {
    return {
      redirect: {
        destination: `/login?callbackUrl=/cms`,
        permanent: false,
      }, // close redirect
    }; // close return
  } // close if session

  // Return props
  return {
    props: {
      currSession: session ? session : null,
    }, // close props
  }; // close return
}; // close getServerSide
