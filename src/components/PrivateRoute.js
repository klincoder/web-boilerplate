// Import resources
import React, { useEffect } from "react";

// Import custom files
import useAppSettings from "../hooks/useAppSettings";
import { useAuthContext } from "../context/AuthContext";
import { privateRouteArr } from "../config/data";

// Component
const PrivateRoute = ({ children }) => {
  // Define auth context
  const { user } = useAuthContext();

  // Define app settings
  const { router, currPath } = useAppSettings();

  // Define variables
  const isPrivateRoute = user?.id && privateRouteArr?.includes(currPath);

  // Debug
  // console.log("Debug privateRoute: ", { currPath, isPrivateRoute });

  // SIDE EFFECTS
  // CHECK VALID ROUTES
  useEffect(() => {
    // If isPrivateRoute
    if (isPrivateRoute) {
      //Push to cms
      router.push("/cms");
    } // clcose if
  }, [router, isPrivateRoute]);

  // Return component
  return <>{children}</>;
}; // close component

// Export
export default PrivateRoute;
