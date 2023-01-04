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

// Component
const TestPage = ({ currSession, pageDetails }) => {
  // Define app setting
  const { siteInfo, appSettings } = useAppSettings();

  // Define state
  const [loading, setLoading] = useState(false);
  const { user } = useAuthState();

  // Debug
  //console.log("Debug TestPage: ", appSettings);

  // Return component
  return (
    <PageContent currSession={currSession} title="Test Page">
      {/** TEST */}
      {/* <div className="container mx-auto p-3 my-10 rounded-lg shadow-lg">
        <CustomButton
          isNormal
          disabled={loading}
          onClick={async () => {
            let result,
              name = "Ctech",
              email = "klincoder92@gmail.com",
              userID = "zfVK1dAHwedlmQW9Fazut55knz12";
            setLoading(true);

            // Fireadmin actions
            //result = await handleFireAdminAction(email, "pass-reset");
            //const verifyEmail = handleSendVerifyEmail()
            //const verifyEmail = handleSendPassResetEmail()

            // Send email
            // const otpMsg = { toName: name, toEmail: email, otp: 124879 };
            // result = await handleSendEmail(otpMsg, apiRoutes?.otp);

            // Hash val
            // const hashVal = handleHashVal("123456");
            // const compareVal = handleCompareHashVal("12345", hashVal);
            // result = { hashVal, compareVal };

            // Add to db
            const docRef = doc(
              collection(fireDB, "users", userID, "blog_posts")
            );
            await setDoc(docRef, {
              id: docRef?.id,
            });

            //console.log("Debug testBtn: ", result);
            setLoading(false);
          }}
        >
          TEST BUTTON {loading && <CustomSpinner />}
        </CustomButton>
      </div> */}
    </PageContent>
  ); // close return
}; // close component

// Export
export default TestPage;

// GET SEVERSIDE PROPS
export const getServerSideProps = async (context) => {
  // Get session
  const session = await getSession(context);

  // Return props
  return {
    props: {
      currSession: session?.user || null,
    }, // close props
  }; // close return
}; // close getServerSide
