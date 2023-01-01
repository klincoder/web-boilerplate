// Import resources
import React, { useState, useEffect } from "react";
import nookies from "nookies";
import useLocalStorage, { deleteFromStorage } from "@rehooks/local-storage";
import { FiCheckCircle } from "react-icons/fi";

// Import custom files
import twStyles from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import useAppSettings from "../src/hooks/useAppSettings";
import CustomAlertMsg from "../src/components/CustomAlertMsg";
import { alertMsg, apiRoutes, baseUrl } from "../src/config/data";
import { handleSendEmail, handleSiteInfo } from "../src/config/functions";
import { applyActionCode, fireAuth } from "../src/config/firebase";
import CustomSpinner from "../src/components/CustomSpinner";

// Component
const AuthActions = ({ siteInfo }) => {
  // Define app settings
  const { isMounted, router, routeQuery, todaysDate2 } = useAppSettings();

  // Define local storage
  const [tempData] = useLocalStorage("tempEmail");

  // Define state
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  // Define variables
  const pageTitle = "Auth Confirmation";
  const mode = routeQuery?.mode;
  const actionCode = routeQuery?.oobCode;
  const continueUrl = routeQuery?.continueUrl || baseUrl;
  const lang = routeQuery?.lang || "en";
  const isVerifyEmail = mode === "verifyEmail";
  const isResetPass = mode === "resetPassword";
  const userEmail = tempData?.email;
  const username = tempData?.username;
  const fromName = siteInfo?.name;
  const emailMsg = {
    username: username,
    email: userEmail,
    date: todaysDate2,
  };

  // Debug
  //console.log("Debug authActions: ", currSession);

  // SIDE EFFECTS
  // HANDLE ACTION CODE
  useEffect(() => {
    // On mount
    //isMounted.current = true;
    // IIFE
    (async () => {
      // Try catch
      try {
        // If mode
        if (isVerifyEmail) {
          // Verify action code
          //await handleVerifyEmail(actionCode);
          await applyActionCode(fireAuth, actionCode).then((res) => {
            // await handleSendEmail(
            //   "user",
            //   username,
            //   userEmail,
            //   emailMsg,
            //   apiRoutes?.welcome,
            //   fromName
            // );
            deleteFromStorage("tempData");
            setStatus({ type: "succ", message: alertMsg?.verifyEmailSucc });
            //setLoading(false);
          });
        } else if (isResetPass) {
          setLoading(false);
        } else {
          setStatus({ type: "err", message: alertMsg?.authErr });
          setLoading(false);
        } // close if
      } catch (err) {
        setStatus({ type: "err", message: alertMsg?.generalErr });
        setLoading(false);
        console.log("Debug authActions 3: ", err.message);
      } // close try catch
    })(); // close fxn
    // Clean up
    // return () => {
    //   isMounted.current = false;
    // };
  }, []);

  // Return component
  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <CustomSpinner />
        </div>
      ) : (
        <PageContent title={pageTitle} siteInfo={siteInfo}>
          {/** SECTION */}
          <section className="bg-white">
            {/** CONTAINER */}
            <div className="container mx-auto flex flex-col items-center px-6 pt-24">
              {/** COL 1 - STATUS */}
              <div className="flex flex-col px-10 py-6 border rounded-lg shadow-lg">
                {/** If succ */}
                {status?.type === "succ" && (
                  <CustomAlertMsg
                    isIcon
                    type="success"
                    title="Success"
                    description={status?.message}
                  />
                )}

                {/** If succ */}
                {status?.type === "err" && (
                  <CustomAlertMsg
                    isIcon
                    type="error"
                    title="Error"
                    description={status?.message}
                  />
                )}

                {/** If isResetPass */}
                {isResetPass && <div>Reset password form</div>}
              </div>
            </div>
          </section>
        </PageContent>
      )}
    </>
  ); // close return
}; // close component

// Export
export default AuthActions;

// GET SEVERSIDE PROPS
export const getServerSideProps = async (context) => {
  // Get data
  const siteInfo = await handleSiteInfo();

  // Return props
  return {
    props: {
      siteInfo: siteInfo || null,
    }, // close props
  }; // close return
}; // close getServerSide
