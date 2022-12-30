// Import resources
import React from "react";

// Import custom files
import twStyles from "../styles/twStyles";
import useAuthState from "../hooks/useAuthState";
import CustomModal from "./CustomModal";

// Component
const LogoutModal = () => {
  // Define auth
  const { handleLogout } = useAuthState();

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
