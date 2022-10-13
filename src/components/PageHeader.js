// Import resources
import React, { useState } from "react";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";
import useAppSettings from "../hooks/useAppSettings";
import NavLinkItem from "./NavLinkItem";
import NavLinkDropdown from "./NavLinkDropdown";
import ProfileIcon from "./ProfileIcon";
import LogoIcon from "./LogoIcon";
import ToggleMenuBtn from "./ToggleMenuBtn";
import { appImages, navLinks } from "../config/data";

// Component
const PageHeader = ({ userID }) => {
  // Define state
  const [toggleMenu, setToggleMenu] = useState(false);

  // Define app settings
  const { currPath, isBlogSlug } = useAppSettings();

  // Debug
  //console.log("Debug pageHeader: ", currPath);

  // FUNCTIONS
  // HANDLE TOGGLE MENU
  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  }; // close funx

  // Return component
  return (
    <nav className="relative container mx-auto px-6 py-3 border-b border-gray-200">
      {/** LINK CONTAINER */}
      <div className="flex items-center justify-between">
        {/** COL 1 - LOGO */}
        <div>
          <LogoIcon />
        </div>

        {/** COL 2 - LARGE SCREEN LINKS */}
        <div className="flex items-center space-x-6 text-gray-700">
          {/** Loop navLinks */}
          <div className="hidden space-x-6 md:flex">
            {navLinks?.length > 0 &&
              navLinks?.map((item) => {
                // If isDropdown
                if (item?.isDropdown) {
                  // Return navLinkItem
                  return (
                    <NavLinkDropdown
                      key={item?.id}
                      title={item?.title}
                      data={item?.options}
                      currPath={currPath}
                    />
                  ); // close return
                } else {
                  // Return navLinkItem
                  return (
                    <NavLinkItem
                      key={item?.id}
                      rowData={item}
                      linkClass={`
                        ${item?.isBlog && isBlogSlug && "!text-primary"}  
                        ${
                          currPath === item?.link
                            ? "!text-primary"
                            : "text-gray-600 no-underline"
                        }
                      `}
                    />
                  ); // close return
                } // close if isDropdown
              })}
          </div>

          {/** Login button */}
          {/** If userID, show profile icon else login button */}
          {userID ? (
            <ProfileIcon />
          ) : (
            <CustomButton id="menuBtn" isLink href="/login">
              <a className={`hidden md:block ${tw?.btnPrimary}`}>Login</a>
            </CustomButton>
          )}
        </div>

        {/** Toggle menu button */}
        <ToggleMenuBtn isToggle={toggleMenu} onClick={handleToggleMenu} />
      </div>

      {/** SMALL SCREEN LINKS */}
      {toggleMenu && (
        <div
          id="navLinksSmallScreen"
          className="absolute left-6 right-6 z-50 flex flex-col items-center self-end py-8 mt-6 text-gray-700 font-bold space-y-6 bg-white drop-shadow-md sm:w-auto sm:self-center md:hidden"
        >
          {/** Loop navLinks */}
          {navLinks?.length > 0 &&
            navLinks?.map((item) => {
              // If isDropdown
              if (item?.isDropdown) {
                // Return navLinkItem
                return (
                  <NavLinkDropdown
                    key={item?.id}
                    title={item?.title}
                    data={item?.options}
                    currPath={currPath}
                  />
                ); // close return
              } else {
                // Return navLinkItem
                return (
                  <NavLinkItem
                    key={item?.id}
                    rowData={item}
                    linkClass={`
                      ${currPath === item?.link ? "text-primary" : ""}
                      ${item?.isBlog && isBlogSlug && "text-primary"}
                    `}
                  />
                ); // close return
              } // close if isDropdown
            })}
          {/** Buttons */}
          {/** if !userID */}
          {!userID && (
            <div className="w-full text-center px-4">
              {/** Login button */}
              <CustomButton isLink id="loginBtnSmallScreen" href="/login">
                <a className={`w-full my-3 ${tw?.btnPrimary}`}>Login</a>
              </CustomButton>
              {/** Register button */}
              <CustomButton isLink id="registerBtnSmallScreen" href="/register">
                <a className={`w-full ${tw?.btnSecondary}`}>Register</a>
              </CustomButton>
            </div>
          )}
        </div>
      )}
    </nav>
  ); // close return
}; // close component

// Export
export default PageHeader;
