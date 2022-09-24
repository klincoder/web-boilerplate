// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";
import CustomModal from "./CustomModal";
import { useAuthContext } from "../context/AuthContext";

// Component
const LogoutModal = () => {
  // Define auth context
  const { handleLogout } = useAuthContext();

  // Debug
  //console.log("Debug logoutModal: ",)

  // Return component
  return (
    <CustomModal
      showConfirm
      title="Confirm Logout"
      modalID="logoutModal"
      onConfirm={async () => await handleLogout()}
    >
      <p>Are you sure you want to logout?</p>
    </CustomModal>
  ); // close return
}; // close component

// Export
export default LogoutModal;
