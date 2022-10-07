// Import resources
import React, { useEffect } from "react";

// Import custom files
import CustomLoader from "./CustomLoader";
import useAppSettings from "../hooks/useAppSettings";
import { useAuthContext } from "../context/AuthContext";

// Component
const ProtectedRoute = ({ children }) => {
  // Define auth context
  const { user } = useAuthContext();

  // Define app settigs
  const { router } = useAppSettings();

  // Debug
  //console.log("Debug protectedRoute: ", !user?.id);

  // SIDE EFFECTS
  // CHECK VALID ROUTES
  useEffect(() => {
    if (user?.id === "") {
      // Push to login
      router.push("/");
    } // close if
  }, [router, user?.id]);

  // Return component
  return <>{user?.id ? children : <CustomLoader />}</>; // close return
}; // close component

// Export
export default ProtectedRoute;
