// Import resources
import React, { useState } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";

// Import custom files
import twStyles from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import CustomButton from "../src/components/CustomButton";
import FormTest from "../src/components/FormTest";
import CustomSpinner from "../src/components/CustomSpinner";
import useAuthState from "../src/hooks/useAuthState";
import useAppSettings from "../src/hooks/useAppSettings";
import { apiRoutes, baseUrl } from "../src/config/data";
import {
  handleCompareHashVal,
  handleGetPageDetails,
  handleHashVal,
  handleSendEmail,
} from "../src/config/functions";
import {
  collection,
  doc,
  fireAuth,
  fireDB,
  setDoc,
} from "../src/config/firebase";
import { set } from "react-hook-form";

// Component
const Home = ({ currSession, pageDetails }) => {
  // Define app setting
  const { siteInfo } = useAppSettings();

  // Define state
  const [loading, setLoading] = useState(false);
  const { user } = useAuthState();

  // Debug
  //console.log("Debug home: ",);

  // Return component
  return (
    <PageContent currSession={currSession} pageDetails={pageDetails}>
      {/** SECTION HERO */}
      {/** TEST */}
      <div className="container mx-auto p-3 my-10 rounded-lg shadow-lg">
        <CustomButton
          isNormal
          disabled={loading}
          onClick={async () => {
            let result,
              name = "Ctech",
              email = "klincoder92@gmail.com";
            //setLoading(true);

            // Send email
            // const otpMsg = { toName: name, toEmail: email, otp: 324879 };
            // result = await handleSendEmail(otpMsg, apiRoutes?.otp);

            // Hash val
            // const hashVal = handleHashVal("123456");
            // const compareVal = handleCompareHashVal("12345", hashVal);
            // result = { hashVal, compareVal };

            console.log("Debug testBtn: ", result);
            //setLoading(false);
          }}
        >
          TEST BUTTON {loading && <CustomSpinner />}
        </CustomButton>
      </div>
    </PageContent>
  ); // close return
}; // close component

// Export
export default Home;

// GET SEVERSIDE PROPS
export const getServerSideProps = async (context) => {
  // Get session
  const session = await getSession(context);

  // Get data
  const pageData = await handleGetPageDetails("home");

  // Return props
  return {
    props: {
      currSession: session?.user || null,
      pageDetails: pageData || null,
    }, // close props
  }; // close return
}; // close getServerSide
