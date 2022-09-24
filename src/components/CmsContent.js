// Import resources
import React, { useState } from "react";

// Import custom files
import PageMeta from "./PageMeta";
import CmsHeader from "./CmsHeader";
import CmsFooter from "./CmsFooter";
import CmsSidebar from "./CmsSidebar";
import useAppSettings from "../hooks/useAppSettings";
import LogoutModal from "./LogoutModal";
import LibraryShowcaseModal from "./LibraryShowcaseModal";
import VerifyPageAccess from "./VerifyPageAccess";
import { useAuthContext } from "../context/AuthContext";

// Component
const CmsContent = ({ title, pageAccess, children }) => {
  // Define auth context
  const { user } = useAuthContext();

  // Define app settings
  const { siteInfo } = useAppSettings();

  // Debug
  //console.log("Debug cmsContent: ", pageAccess);

  // Return component
  return (
    <div className="min-h-screen">
      {/** Page meta */}
      <PageMeta title={title} />

      {/** Header */}
      <CmsHeader />

      {/** Sidebar */}
      <CmsSidebar userRole={user?.role} />

      {/** Page body */}
      <div className="min-h-screen bg-gray-50 md:pl-60">
        {/** Children */}
        <div className="p-6">
          <VerifyPageAccess pageAccess={pageAccess}>
            {children}
          </VerifyPageAccess>
        </div>

        {/** Footer */}
        <div className="sticky top-full">
          <CmsFooter />
        </div>
      </div>

      {/** MODALS */}
      {/** Logout modal */}
      <LogoutModal />
      {/** Library showcase modal */}
      <LibraryShowcaseModal />
    </div>
  ); // close return
}; // close component

// Export
export default CmsContent;
