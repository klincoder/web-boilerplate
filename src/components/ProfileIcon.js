// Import resources
import React from "react";

// Import custom files
import twStyles from "../styles/twStyles";
import CustomButton from "./CustomButton";
import CustomDivider from "./CustomDivider";
import CustomImage from "./CustomImage";
import LogoutBtn from "./LogoutBtn";
import useAuthState from "../hooks/useAuthState";
import { appImages } from "../config/data";

// Component
const ProfileIcon = ({ showTitle, userAvatar }) => {
  // Define state
  const { user } = useAuthState();

  // Debug
  //console.log("Debug profileIcon: ",)

  // Return component
  return (
    <div className="flex gap-3">
      {/** TITLE */}
      {showTitle && (
        <span className="!text-gray-700 hidden md:block">{`Hi, ${user?.usernameFormat}`}</span>
      )}

      {/** AVATAR DROPDOWN */}
      <div className="dropstart relative">
        {/** Image */}
        <CustomButton
          isLink
          id="profileIcon"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          styleBtn="dropdown-toggle flex items-center hidden-arrow"
        >
          <CustomImage
            image={userAvatar || appImages?.avatar}
            styleImage="rounded-full object-cover"
            alt="avatar"
            width={25}
            height={25}
          />
        </CustomButton>

        {/** DROPDOWN LINKS */}
        <ul
          aria-labelledby="profileIcon"
          className="dropdown-menu list-none absolute z-50 right-0 hidden text-base text-left py-2 p-0 m-0 bg-white border-none left-auto float-left rounded-lg shadow-lg min-w-max bg-clip-padding"
        >
          {/** Dashboard */}
          <li className="dropdown-item pt-3 pb-1 px-4 hover:bg-gray-100">
            <CustomButton
              isLink
              href="/cms"
              styleBtn="text-sm text-gray-700 font-normal bg-transparent no-underline"
            >
              Dashboard
            </CustomButton>
          </li>

          {/** Settings */}
          <li className="dropdown-item pt-3 pb-1 px-4 hover:bg-gray-100">
            <CustomButton
              isLink
              href="/cms/settings"
              styleBtn="text-sm text-gray-700 font-normal bg-transparent no-underline"
            >
              Settings
            </CustomButton>
          </li>

          {/** Divider */}
          <CustomDivider />

          {/** LOGOUT BUTTON */}
          <li>
            <LogoutBtn />
          </li>
        </ul>
      </div>
    </div>
  ); // close return
}; // close component

// Export
export default ProfileIcon;
