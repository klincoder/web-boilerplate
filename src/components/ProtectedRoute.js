// Import resources
import { useRouter } from "next/router";
import { useEffect } from "react";

// Import custom files
import CustomLoader from "./CustomLoader";
import { useAuthContext } from "../context/AuthContext";

// Component
const ProtectedRoute = ({ children }) => {
  // Define auth context
  const { user } = useAuthContext();

  // Define router
  const router = useRouter();

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
