// Import resources
import React from "react";

// Import custom files
import PageAccessWarning from "./PageAccessWarning";
import useAppSettings from "../hooks/useAppSettings";
import { cmsLinks } from "../config/data";
import { handleVerifyCmsPageAccess } from "../config/functions";

// Component
const VerifyPageAccess = ({ pageAccess, children }) => {
  // Define app settings
  const { currPath } = useAppSettings();

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
