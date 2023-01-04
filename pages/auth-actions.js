// Import resources
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

// Import custom files
import twStyles from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import useAppSettings from "../src/hooks/useAppSettings";
import useAuthState from "../src/hooks/useAuthState";
import CustomAlertMsg from "../src/components/CustomAlertMsg";
import FormPasswordReset from "../src/components/FormPasswordReset";
import CustomSpinner from "../src/components/CustomSpinner";
import CustomButton from "../src/components/CustomButton";
import { alertMsg } from "../src/config/data";
import { applyActionCode, fireAuth } from "../src/config/firebase";

// Component
const AuthActions = ({ currSession }) => {
  // Define app settings
  const { routeQuery, isRouteQuery } = useAppSettings();

  // Define state
  const { user, handlePasswordReset } = useAuthState();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  // Define variables
  const pageTitle = "Auth Verification";
  const mode = routeQuery?.mode;
  const actionCode = routeQuery?.oobCode;
  const continueUrl = routeQuery?.continueUrl;
  const lang = routeQuery?.lang;
  const isVerifyEmail = mode === "verifyEmail";
  const isPassReset = mode === "resetPassword";
  const isStatus = status?.type ? true : false;

  // Debug
  //console.log("Debug authActions: ", currSession);

  // SIDE EFFECTS
  // HANDLE AUTH ACTIONS
  useEffect(() => {
    // Handle auth action
    const handleAuthAction = async (actionCode) => {
      // If empty args, return
      if (!actionCode || isStatus) return;
      // Try catch
      try {
        // Switch mode
        switch (mode) {
          case "verifyEmail":
            // Verify email
            await applyActionCode(fireAuth, actionCode).then(() => {
              setStatus({ type: "succ", msg: "Email Address Verified" });
              setLoading(false);
            });
            break;
          case "resetPassword":
            setStatus({ type: "succ", msg: "Reset Password" });
            setLoading(false);
            break;
        } // close switch
      } catch (err) {
        setStatus({ type: "err", msg: alertMsg?.authActionErr });
        setLoading(false);
        //console.log("Debug TRYCATCH: ", err.message);
      } // close try catch
    }; // close fxn
    // Call fxn
    handleAuthAction(actionCode);
  }, [mode, isStatus, actionCode]);

  // If loading
  if (loading) {
    return (
      <div className="h-screen flex flex-row items-center justify-center">
        <CustomSpinner />
      </div>
    ); // close return
  } // close if

  // Return component
  return (
    <PageContent currSession={currSession} title={pageTitle}>
      {/** SECTION */}
      <section className="bg-white">
        {/** ROW */}
        <div className="container mx-auto flex flex-col items-center px-6 py-24">
          {/** COL 1 */}
          <div className="flex flex-col p-6 mb-8 w-full border rounded-lg shadow-lg md:w-3/5">
            {/** IS NOT ROUTE QUERY */}
            {!isRouteQuery && (
              <CustomAlertMsg isIcon type="error" title={status?.msg} />
            )}

            {/** IS VERIFY EMAIL */}
            {isVerifyEmail && (
              <>
                {/** If status succ */}
                {status?.type === "succ" ? (
                  <CustomAlertMsg
                    isIcon
                    type="success"
                    title={status?.msg}
                    actions={
                      <div className="flex flex-col items-center mt-3">
                        <CustomButton
                          isLink
                          href={continueUrl}
                          styleBtn={`text-center ${twStyles?.btnSuccess}`}
                        >
                          Continue to Login
                        </CustomButton>
                      </div>
                    }
                  />
                ) : (
                  <CustomAlertMsg isIcon type="error" title={status?.msg} />
                )}
              </>
            )}

            {/** IS PASS RESET */}
            {isPassReset && (
              <div>
                {/** If status succ */}
                {status?.type === "succ" ? (
                  <>
                    <h3 className="mb-6">{status?.msg}</h3>
                    <FormPasswordReset actionCode={actionCode} />
                  </>
                ) : (
                  <CustomAlertMsg isIcon type="error" title={status?.msg} />
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </PageContent>
  ); // close return
}; // close component

// Export
export default AuthActions;

// GET SEVERSIDE PROPS
// export const getServerSideProps = async (context) => {
//   // Get session
//   const session = await getSession(context);

//   // Return props
//   return {
//     props: {
//       currSession: session || null,
//       pageDetails: pageData || null,
//     }, // close props
//   }; // close return
// }; // close getServerSide
