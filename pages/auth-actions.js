// Import resources
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";

// Import custom files
import tw from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import CustomAlertMsg from "../src/components/CustomAlertMsg";
import FormResetPassword from "../src/components/FormResetPassword";
import CustomCard from "../src/components/CustomCard";
import CustomButton from "../src/components/CustomButton";
import { useAuthContext } from "../src/context/AuthContext";

// Component
const AuthActions = () => {
  // Define auth context
  const { handleVerifyEmail } = useAuthContext();

  // Define state
  const [pageTitle, setPageTitle] = useState("");
  const [actionMsg, setActionMsg] = useState(null);

  // Define isMounted
  const isMounted = useRef(false);

  // Define alert
  const alert = useAlert();

  // Define router
  const router = useRouter();
  const routerQuery = router.query;
  const routerHasQuery = Object.keys(routerQuery)?.length > 0;

  // Debug
  //console.log("Debug authActions: ", actionMsg);

  // SIDE EFFECTS
  // LISTEN TO ROUTER QUERY
  useEffect(() => {
    // On mount
    isMounted.current = true;
    // IIFE
    (async () => {
      // Define variables
      const mode = routerQuery?.mode;
      const actionCode = routerQuery?.oobCode;
      const continueUrl = routerQuery?.continueUrl;
      const lang = routerQuery?.lang || "en";

      // Set state
      //const emailCode = await handleVerifyEmail(actionCode);

      // Switch mode
      switch (mode) {
        // CASE 1
        case "verifyEmail":
          setPageTitle("Email Verification");
          // Try catch
          try {
            // Confirm code
            const confirmCode = await handleVerifyEmail(actionCode);
            setActionMsg({
              mode: "verifyEmail",
              type: "succ",
              msg: `Your email is confirmed.`,
              url: continueUrl,
              lang: lang,
              confirmCode: confirmCode,
            });
          } catch (err) {
            setActionMsg({
              mode: "verifyEmail",
              type: "err",
              msg: `${err.message}`,
              url: continueUrl,
            });
            //console.log("Debug verifyEmail: ", err.message);
          } // close try catch
          break;
        // CASE 2
        case "resetPassword":
          setPageTitle("Reset Password");
          setActionMsg({
            mode: "resetPassword",
            msg: `Reset Password`,
            code: actionCode,
            url: continueUrl,
          });
          break;
        // DEFAULT
        default:
          setPageTitle("Error occurred");
          setActionMsg({ mode: "err", msg: "Invalid code" });
      } // close switch
    })();

    // Clean up
    return () => {
      isMounted.current = false;
    };
  }, [routerQuery, handleVerifyEmail]);

  // Return component
  return (
    <PageContent title={pageTitle}>
      {/** SECTION */}
      <section className="bg-white">
        {/** MAIN CONTAINER */}
        <div className="container mx-auto flex flex-col px-6 pt-14 pb-24">
          {/** COL 1 */}
          <div className="flex flex-col items-center p-6 mb-8 rounded">
            {/** Card */}
            <CustomCard isNormal title={pageTitle}>
              {/** If err */}
              {actionMsg?.mode === "err" && (
                <CustomAlertMsg isNormal type="success">
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

          {/** COL 2 */}
          {/* <div className="flex flex-col p-6 mb-8 rounded shadow-lg md:w-1/2">
            <p>Col 2</p>
          </div> */}
        </div>
      </section>
    </PageContent>
  ); // close return
}; // close component

// Export
export default AuthActions;

// GET SEVER SIDE PROPS
export const getServerSideProps = async (context) => {
  // FETCH DATA
  // Get page details
  // const pageDetailsRef = doc(fireDB, "appSettings", "pagePrivacy");
  // const pageDetailsSnap = await getDoc(pageDetailsRef);
  // const pageDetailsData = pageDetailsSnap.data();

  // Return props
  return {
    props: {
      //pageDetails:  pageDetailsData,
    }, // close props
  }; // close return
}; // close getServerSide
