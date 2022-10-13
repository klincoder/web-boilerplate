// Import resources
import React from "react";

// Import custom files
import PageMeta from "./PageMeta";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";
import useAppSettings from "../hooks/useAppSettings";
import LogoutModal from "./LogoutModal";
import { useAuthContext } from "../context/AuthContext";

// Component
const PageContent = ({
  currSession,
  pageDetails,
  title,
  children,
  ...rest
}) => {
  // Define auth context
  const { user } = useAuthContext();

  // Define app settings
  const { isHomePath, siteInfo, currPath } = useAppSettings();

  // Define variables
  const userID = currSession?.id || user?.id;
  const pageTitle = pageDetails?.title;
  const pageDesc = pageDetails?.description;

  // Debug
  //console.log("Debug pageContent: ",)

  // Return component
  return (
    <div className="min-h-screen">
      {/** Page meta */}
      <PageMeta
        {...rest}
        isNormal
        isHomePath={isHomePath}
        title={pageTitle || title}
        description={pageDesc}
      />

      {/** Header */}
      <PageHeader userID={userID} />

      {/** Page body */}
      <>{children}</>

      {/** Footer */}
      <div className="sticky top-full">
        <PageFooter />
      </div>

      {/** MODALS */}
      {/** Logout modal */}
      <LogoutModal />
    </div>
  ); // close return
}; // close component

// Export
export default PageContent;
