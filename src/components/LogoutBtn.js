// Import resources
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

// Import custom files
import twStyles from "../styles/twStyles";
import CustomButton from "./CustomButton";

// Component
const LogoutBtn = ({ ...rest }) => {
  // Debug
  //console.log("Debug logoutBtn: ",)

  // Return component
  return (
    <CustomButton
      {...rest}
      isModal
      modalID="logoutModal"
      styleBtn="flex items-center gap-2 px-3 py-1 text-sm text-danger"
    >
      <FaSignOutAlt /> Logout
    </CustomButton>
  ); // close return
}; // close component

// Export
export default LogoutBtn;
