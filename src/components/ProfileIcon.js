// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";
import CustomImage from "./CustomImage";
import useAppSettings from "../hooks/useAppSettings";
import CustomDivider from "./CustomDivider";
import LogoutBtn from "./LogoutBtn";
import CustomButton from "./CustomButton";
import { appImages } from "../config/data";

// Component
const ProfileIcon = () => {
  //Define app settings
  const { userAvatar } = useAppSettings();

  // Debug
  //console.log("Debug profileIcon: ",)

  // Return component
  return (
    <div className="dropstart relative">
      {/* <span>Profile</span> */}
      {/** Image */}
      <CustomButton isLink>
        <a
          id="profileIcon"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          className="dropdown-toggle flex items-center hidden-arrow"
        >
          <CustomImage
            image={userAvatar || appImages?.avatar}
            imgClass="rounded-full"
            alt="avatar"
            width={25}
            height={25}
          />
        </a>
      </CustomButton>

      {/** Dropdown list */}
      <ul
        aria-labelledby="profileIcon"
        className="dropdown-menu list-none absolute z-50 right-0 hidden text-base text-left py-2 p-0 m-0 bg-white border-none left-auto float-left rounded-lg shadow-lg min-w-max bg-clip-padding"
      >
        {/** Dashboard */}
        <li className="dropdown-item pt-3 pb-1 px-4 hover:bg-gray-100">
          <CustomButton isLink href="/cms">
            <a className="text-sm text-gray-700 font-normal bg-transparent no-underline">
              Dashboard
            </a>
          </CustomButton>
        </li>

        {/** Settings */}
        <li className="dropdown-item pt-3 pb-1 px-4 hover:bg-gray-100">
          <CustomButton isLink href="/cms/settings">
            <a className="text-sm text-gray-700 font-normal bg-transparent no-underline">
              Settings
            </a>
          </CustomButton>
        </li>

        {/** Divider */}
        <CustomDivider />

        {/** Logput */}
        <li>
          <LogoutBtn />
        </li>
      </ul>
    </div>
  ); // close return
}; // close component

// Export
export default ProfileIcon;
