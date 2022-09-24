// Import resources
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";

// Component
const LogoutBtn = ({ onShowModal, ...rest }) => {
  // Debug
  //console.log("Debug logoutBtn: ",)

  // Return component
  return (
    <>
      {/** Button */}
      <CustomButton
        {...rest}
        isModal
        modalID="logoutModal"
        className="flex items-center gap-2 px-3 py-1 text-sm text-danger"
      >
        <FaSignOutAlt /> Logout
      </CustomButton>
    </>
  ); // close return
}; // close component

// Export
export default LogoutBtn;
