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
import { cmsLinks } from "../config/data";
import { handleVerifyPageAccess } from "../config/functions";

// Component
const PageContent = ({
  isCms,
  currSession,
  pageDetails,
  siteInfo,
  title,
  pageAccess,
  children,
  ...rest
}) => {
  // Define app settings
  const { isHomePath, currPath } = useAppSettings();

  // Define variables
  isCms = isCms ? true : false;
  const userID = currSession?.id;
  const userRole = currSession?.role;
  const userAvatar = currSession?.avatar;
  const pageTitle = pageDetails?.title || title;
  const pageDesc = pageDetails?.description || "";
  const isPageAccess = handleVerifyPageAccess(cmsLinks, pageAccess, currPath);

  // Debug
  //console.log("Debug pageContent: ",)

  // Return component
  return (
    <div className="min-h-screen">
      {/** Page meta */}
      <PageMeta
        {...rest}
        isNormal={!isCms}
        title={pageTitle}
        description={pageDesc}
        siteInfo={siteInfo}
      />

      {/** Header */}
      <PageHeader isCms={isCms} userID={userID} userAvatar={userAvatar} />

      {/** Sidebar */}
      {/* {isCms && <CmsSidebar userRole={userRole} />} */}

      {/** Page body */}
      {isCms ? (
        <div className="min-h-screen bg-gray-50 md:pl-60">
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
          {/** Children */}
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
