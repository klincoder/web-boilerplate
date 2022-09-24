// Import resources
import React from "react";
import { useRouter } from "next/router";

// Import custom files
import PageAccessItem from "./PageAccessItem";
import { useAuthContext } from "../context/AuthContext";
import { userCmsLinks, adminCmsLinks } from "../config/data";
import { handleGetRouteArr, handleIsRoleRoute } from "../config/functions";

// Component
const VerifyPageAccess = ({ pageAccess, children }) => {
  // Define auth context
  const { user } = useAuthContext();

  // Define router
  const router = useRouter();
  const currPath = router.pathname;

  // Define variables
  pageAccess = pageAccess ? pageAccess : "general";
  const isGeneralRoute = pageAccess === "general";
  const isRoleAccess = isGeneralRoute ? true : user?.role === pageAccess;
  const userRoutes = handleGetRouteArr(userCmsLinks);
  const adminRoutes = handleGetRouteArr(adminCmsLinks);
  const isUserRoute =
    isRoleAccess && isGeneralRoute
      ? true
      : handleIsRoleRoute(userRoutes, currPath);
  const isAdminRoute =
    isRoleAccess && isGeneralRoute
      ? true
      : isRoleAccess && handleIsRoleRoute(adminRoutes, currPath);

  // Debug
  // console.log("Debug verifyPageAccess: ", {
  //   isRoleAccess,
  //   isUserRoute,
  //   isAdminRoute,
  // });

  // FUNCTIONS
  // HANDLE PAGE ACCESS
  const handlePageAccess = () => {
    // If isAdminRoute
    if (isAdminRoute) {
      return <>{children}</>;
    } else if (isUserRoute) {
      return <>{children}</>;
    } else {
      return <PageAccessItem />;
    } // close if
  }; // close fxn

  // Return component
  return <>{handlePageAccess()}</>; // close return
}; // close component

// Export
export default VerifyPageAccess;
