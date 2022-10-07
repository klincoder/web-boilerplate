// Import resources
import React from "react";
import { useRouter } from "next/router";

// Import custom files
import PageMeta from "./PageMeta";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";
import LogoutModal from "./LogoutModal";
import useAppSettings from "../hooks/useAppSettings";
import { useAuthContext } from "../context/AuthContext";

// Component
const PageContent = ({ pageDetails, title, children, ...rest }) => {
  // Define auth context
  const { user, loading } = useAuthContext();

  // Define app settings
  const { currPath, isHomePath } = useAppSettings();

  // Define page details
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
      <PageHeader userID={user?.id} loading={loading} />

      {/** Page body */}
      <>{children}</>

      {/** Footer */}
      <div className="sticky top-full">
        <PageFooter currPath={currPath} />
      </div>

      {/** MODALS */}
      {/** Logout modal */}
      <LogoutModal />
    </div>
  ); // close return
}; // close component

// Export
export default PageContent;
