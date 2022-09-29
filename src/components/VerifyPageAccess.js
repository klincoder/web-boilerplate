// Import resources
import React from "react";
import { useRouter } from "next/router";

// Import custom files
import PageAccessWarning from "./PageAccessWarning";
import { cmsLinks } from "../config/data";
import { handleVerifyCmsPageAccess } from "../config/functions";

// Component
const VerifyPageAccess = ({ pageAccess, children }) => {
  // Define router
  const router = useRouter();
  const currPath = router.pathname;

  // Define variables
  const isPageAccess = handleVerifyCmsPageAccess(
    cmsLinks,
    pageAccess,
    currPath
  );

  // Debug
  //console.log("Debug verifyPageAccess: ", { isPageAccess, pageAccess });

  // Return component
  return (
    <>
      {/** If isPageAccess */}
      {isPageAccess ? <>{children}</> : <PageAccessWarning />}
    </>
  ); // close return
}; // close component

// Export
export default VerifyPageAccess;
