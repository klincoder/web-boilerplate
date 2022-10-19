// Import resources
import React, { useCallback, useEffect, useState, memo, useMemo } from "react";
import useLocalStorage, { deleteFromStorage } from "@rehooks/local-storage";

// Import custom files
import tw from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import CustomAlertMsg from "../src/components/CustomAlertMsg";
import FormResetPassword from "../src/components/FormResetPassword";
import CustomCard from "../src/components/CustomCard";
import CustomButton from "../src/components/CustomButton";
import useAppSettings from "../src/hooks/useAppSettings";
import CustomLoader from "../src/components/CustomLoader";
import { useAuthContext } from "../src/context/AuthContext";
import { apiRoutes, baseUrl } from "../src/config/data";
import { handleSendEmail } from "../src/config/functions";

// Component
const AuthActions = () => {
  // Define auth context
  const { handleVerifyEmail } = useAuthContext();

  // Define state
  const [pageTitle, setPageTitle] = useState("Verification");
  const [actionMsg, setActionMsg] = useState(null);
  const [isReady, setIsReady] = useState(false);

  // Define app settings
  const { isMounted, routerQuery, router, alert, todaysDate2 } =
    useAppSettings();

  // Define loca storage
  const [tempEmailData] = useLocalStorage("tempEmail");
  const finalEmail = tempEmailData?.email;
  const finalUsername = tempEmailData?.username;

  // Define variables
  const mode = routerQuery?.mode;
  const actionCode = routerQuery?.oobCode;
  const continueUrl = routerQuery?.continueUrl || baseUrl;
  const lang = routerQuery?.lang || "en";

  // Debug
  //console.log("Debug authActions 1: ", actionMsg);

  // FUNCTIONS
  // HANDLE ERROR MESSAGE
  const handleErrMsg = () => {
    // Set page title
    setPageTitle("Verification Error");
    setActionMsg({ mode: "empty", type: "err", msg: "Invalid code" });
    setIsReady(true);
  }; // close fxn

  // HANDLE SUCCESS MESSAGE
  const handleSuccMsg = useCallback(
    (mode, msg) => {
      // Set action msg
      setActionMsg({
        mode: mode,
        type: "succ",
        msg: msg,
        code: actionCode,
        url: continueUrl,
      });
      setIsReady(true);
    },
    [actionCode, continueUrl]
  ); // close if

  // HANDLE ACTION CODE
  const handleActionCode = useCallback(async () => {
    // Try catch
    try {
      // Switch mode
      switch (mode) {
        case "verifyEmail":
          // Set page title
          setPageTitle("Email Verification");
          // Verify email verification code
          await handleVerifyEmail(actionCode);
          // Define variables
          const emailMsg = {
            username: finalUsername,
            email: finalEmail,
            date: todaysDate2,
          };
          // Send user welcome email
          await handleSendEmail(
            "user",
            finalUsername,
            finalEmail,
            emailMsg,
            apiRoutes?.welcome
          );
          deleteFromStorage("tempEmail");
          //console.log("Debug authActions 2: ", { tempEmailData, emailMsg });
          router.push("/login?verifyEmailMsg=true");
          break;
        case "resetPassword":
          // Set page title
          setPageTitle("Reset Password");
          handleSuccMsg("resetPassword");
          break;
        default:
          // Alert err
          handleErrMsg();
      } // close switch
    } catch (err) {
      handleErrMsg();
      //console.log("Debug authActions 3: ", err.message);
    } // close try catch
  }, [
    mode,
    actionCode,
    router,
    finalEmail,
    finalUsername,
    todaysDate2,
    handleVerifyEmail,
    handleSuccMsg,
  ]); // close fxn

  // SIDE EFFECTS
  // LISTEN TO ROUTER QUERY
  useEffect(() => {
    // On mount
    isMounted.current = true;
    // IIFE
    (async () => {
      // Call fxn
      await handleActionCode();
    })(); // close fxn
    // Clean up
    return () => {
      isMounted.current = false;
    };
  }, [isMounted, handleActionCode]);

  // Return component
  return (
    <PageContent title={pageTitle}>
      {/** If !isReady */}
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
                  <>
                    {/** Message */}
                    <CustomAlertMsg
                      isNormal
                      type={actionMsg?.type === "succ" ? "success" : "danger"}
                    >
                      {actionMsg?.msg}
                    </CustomAlertMsg>
                    {/** Button */}
                    {actionMsg?.type === "succ" && (
                      <CustomButton
                        isNormal
                        onClick={() => router.push("/login")}
                        btnClass={`w-full -mt-2 ${tw?.btnPrimary}`}
                      >
                        Login
                      </CustomButton>
                    )}
                  </>
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
export default memo(AuthActions);
