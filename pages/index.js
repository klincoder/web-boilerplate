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
import { apiRoutes, baseUrl } from "../src/config/data";
import { handleAppSettings } from "../src/config/functions";
import {
  collection,
  doc,
  fireAuth,
  fireDB,
  setDoc,
} from "../src/config/firebase";

// Component
const Home = ({ currSession, pageDetails }) => {
  // Define state
  const [loading, setLoading] = useState(false);

  // Debug
  //console.log("Debug home: ", testVar);

  // Return component
  return (
    <PageContent currSession={currSession} pageDetails={pageDetails}>
      {/** SECTION HERO */}
      {/** TEST */}
      {/* <div className="container mx-auto p-3 my-10 rounded-lg shadow-lg">
        <CustomButton
          isNormal
          disabled={loading}
          onClick={async () => {
            let result;
            let email = "klincoder92@gmail.com";
            setLoading(true);

            // Custom token
            // result = await handleFireAdminAction(email, "custom-token");
            // console.log("Debug testBtn: ", result);

            // Add to db
            // const addRef = doc(collection(fireDB, "users"));
            // await setDoc(addRef, {
            //   id: addRef?.id,
            // }).catch((err) => {
            //   console.log("Debug testBtn: ", err.message);
            // });

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
export default Home;

// GET SEVERSIDE PROPS
export const getServerSideProps = async (context) => {
  // Get session
  const session = await getSession(context);

  // Get data
  const pageData = await handleAppSettings("page_home");

  // Return props
  return {
    props: {
      currSession: session?.user || null,
      pageDetails: pageData || null,
    }, // close props
  }; // close return
}; // close getServerSide
