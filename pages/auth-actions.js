// Import resources
import React, { useEffect, useState } from "react";
import nookies from "nookies";

// Import custom files
import tw from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import CustomAlertMsg from "../src/components/CustomAlertMsg";
import FormResetPassword from "../src/components/FormResetPassword";
import CustomCard from "../src/components/CustomCard";
import CustomButton from "../src/components/CustomButton";
import useAppSettings from "../src/hooks/useAppSettings";
import CustomSpinner from "../src/components/CustomSpinner";
import CustomLoader from "../src/components/CustomLoader";
import { useAuthContext } from "../src/context/AuthContext";
import { baseUrl } from "../src/config/data";
import { handleVerifyIdToken } from "../src/config/firebaseAdmin";

// Component
const AuthActions = () => {
  // Define auth context
  const { handleVerifyEmail } = useAuthContext();

  // Define state
  const [pageTitle, setPageTitle] = useState("Auth Actions");
  const [actionMsg, setActionMsg] = useState(null);
  const [isReady, setIsReady] = useState(false);

  // Define app settings
  const { isMounted, routerQuery, router, alert } = useAppSettings();

  // Define variables
  const mode = routerQuery?.mode;
  const actionCode = routerQuery?.oobCode;
  const continueUrl = routerQuery?.continueUrl || baseUrl;
  const lang = routerQuery?.lang || "en";

  // Debug
  //console.log("Debug authActions: ", actionMsg);

  // FUNCTIONS
  // HANDLE VERIFY AUTH CODE
  const handleVerifyAuthCode = async (mode, actionCode) => {
    // Try catch
    try {
      // Switch mode
      switch (mode) {
        case "verifyEmail":
          // Set page title
          setPageTitle("Email Confirmation");
          // Verify email confirmation code
          await handleVerifyEmail(actionCode);
          alert.success("Email confirmed successfully");
          router.push("/cms");
          //console.log("Debug authActions: ", verifiedEmail);
          setIsReady(true);
          break;
        case "resetPassword":
          // Set page title
          setPageTitle("Reset Password");
          setActionMsg({
            mode: "resetPassword",
            msg: `Reset Password`,
            code: actionCode,
            url: continueUrl,
          });
          setIsReady(true);
          break;
        // default:
        //   setActionMsg({ mode: "empty", type: "err", msg: "Invalid code" });
        //   setIsReady(true);
      } // close switch
    } catch (err) {
      setActionMsg({ mode: "empty", type: "err", msg: "Invalid code" });
      setIsReady(true);
      //console.log("Debug authActions: ", err.message);
    } // close try catch
  }; // close if

  // SIDE EFFECTS
  // LISTEN TO ROUTER QUERY
  useEffect(() => {
    // On mount
    isMounted.current = true;
    // IIFE
    (async () => {
      // Call handleVerifyAuthCode
      await handleVerifyAuthCode(mode, actionCode);
    })(); // close ife fxn
    // Clean up
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Return component
  return (
    <PageContent title={pageTitle}>
      {/** If isReady */}
      {!isReady ? (
        <CustomLoader />
      ) : (
        <section className="bg-white">
          {/** MAIN CONTAINER */}
          <div className="container mx-auto flex flex-col px-6 pt-14 pb-24">
            {/** COL 1 */}
            <div className="flex flex-col items-center p-6 mb-8 rounded">
              {/** Card */}
              <CustomCard isNormal title={pageTitle}>
                {/** If empty */}
                {actionMsg?.mode === "empty" && (
                  <CustomAlertMsg isNormal type="danger">
                    <div>{actionMsg?.msg}</div>
                  </CustomAlertMsg>
                )}

                {/** If verifyEmail */}
                {actionMsg?.mode === "verifyEmail" && (
                  <CustomAlertMsg
                    isNormal
                    type={actionMsg?.type === "succ" ? "success" : "danger"}
                  >
                    {/** Message */}
                    <div>{actionMsg?.msg}</div>
                    {/** Button */}
                    {actionMsg?.type === "succ" && (
                      <CustomButton isLink href="/login">
                        Login
                      </CustomButton>
                    )}
                  </CustomAlertMsg>
                )}

                {/** If resetPassword */}
                {actionMsg?.mode === "resetPassword" && (
                  <FormResetPassword actionCode={actionMsg?.code} />
                )}
              </CustomCard>
            </div>
          </div>
        </section>
      )}
    </PageContent>
  ); // close return
}; // close component

// Export
export default AuthActions;

// GET SEVERSIDE PROPS
export const getServerSideProps = async (context) => {
  // Get session
  const ftoken = nookies.get(context)?.ftoken;
  const session = await handleVerifyIdToken(ftoken);

  // Return props
  return {
    props: {
      currSession: session ? session : null,
    }, // close props
  }; // close return
}; // close getServerSide
