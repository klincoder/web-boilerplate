// Import resources
import React from "react";

// Import custom files
import twStyles from "../styles/twStyles";
import useAppSettings from "../hooks/useAppSettings";
import PageMeta from "./PageMeta";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";
import LogoutModal from "./LogoutModal";
import CustomAlertMsg from "./CustomAlertMsg";
import CustomModal from "./CustomModal";
import CmsSidebar from "./CmsSidebar";
import { cmsLinks } from "../config/data";
import { handleVerifyPageAccess } from "../config/functions";

// Component
const PageContent = ({
  isCms,
  currSession,
  pageDetails,
  title,
  pageAccess,
  children,
  ...rest
}) => {
  // Define app settings
  const { siteInfo, isHomePath, currPath } = useAppSettings();

  // Define variables
  isCms = isCms ? true : false;
  const userID = currSession?.id;
  const userRole = currSession?.role;
  const userAvatar = currSession?.avatar;
  const isPageAccess = handleVerifyPageAccess(cmsLinks, pageAccess, currPath);

  // Debug
  //console.log("Debug pageContent: ", title);

  // Return component
  return (
    <div className="min-h-screen">
      {/** Meta */}
      <PageMeta
        {...rest}
        isNormal={!isCms}
        pageDetails={pageDetails}
        pageTitle={title}
      />

      {/** Header */}
      <PageHeader isCms={isCms} userID={userID} userAvatar={userAvatar} />

      {/** Cms sidebar */}
      {isCms && <CmsSidebar userRole={userRole} />}

      {/** Body */}
      {isCms ? (
        <div className="min-h-screen bg-gray-50 md:pl-60">
          {/** Main */}
          <div className="p-6">
            {isPageAccess ? <>{children}</> : <CustomAlertMsg isNormal />}
          </div>
          {/** Footer */}
          <div className="sticky top-full">
            <PageFooter isCms siteInfo={siteInfo} />
          </div>
        </div>
      ) : (
        <>
          {/** Main */}
          <>{children}</>
          {/** Footer */}
          <div className="sticky top-full">
            <PageFooter siteInfo={siteInfo} />
          </div>
        </>
      )}

      {/** MODALS */}
      {/** Logout */}
      <LogoutModal />

      {/** Library showcase */}
      {/* <CustomModal
        title="Library"
        modalID="libraryShowcaseModal"
        dialogDivClass="modal-lg"
      >
        <LibraryShowcase />
      </CustomModal> */}

      {/** Blog category */}
      {/* <CustomModal
        title="Blog Category"
        modalID="blogCategoryModal"
        dialogDivClass="modal-md"
      >
        <FormBlogCategory isModal />
      </CustomModal> */}
    </div>
  ); // close return
}; // close component

// Export
export default PageContent;
