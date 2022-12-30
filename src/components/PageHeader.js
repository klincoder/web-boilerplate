// Import resources
import React from "react";
import { useRecoilState } from "recoil";

// Import custom files
import twStyles from "../styles/twStyles";
import useAppSettings from "../hooks/useAppSettings";
import LogoIcon from "./LogoIcon";
import NavLinkItem from "./NavLinkItem";
import ProfileIcon from "./ProfileIcon";
import ToggleMenuBtn from "./ToggleMenuBtn";
import CustomButton from "./CustomButton";
import { navLinks } from "../config/data";
import { toggleMenuAtom } from "../recoil/atoms";

// Component
const PageHeader = ({ isCms, userID, userAvatar }) => {
  // Define app settings
  const { currPath, isBlogSlug } = useAppSettings();

  // Define state
  const [toggleMenu, setToggleMenu] = useRecoilState(toggleMenuAtom);

  // Debug
  //console.log("Debug pageHeader: ", navLinks?.length);

  // FUNCTIONS
  // HANDLE TOGGLE MENU
  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  }; // close fnx

  // HANDLE SHOW NAV LINKS
  const handleShowNavLinks = () => {
    // Return
    return (
      // Loop data
      navLinks?.length > 0 &&
      navLinks?.map((item) => {
        // If isDropdown
        if (item?.isDropdown) {
          return (
            <NavLinkItem
              isDropDown
              key={item?.id}
              title={item?.title}
              rowDataOpt={item?.options}
              currPath={currPath}
            />
          ); // close return
        } else {
          return (
            <NavLinkItem
              key={item?.id}
              rowData={item}
              styleBtn={`
                ${item?.isBlog && isBlogSlug && "!text-primary"}  
                ${
                  currPath === item?.link
                    ? "!text-primary"
                    : "text-black no-underline"
                }
              `}
            />
          ); // close return
        } // close if isDropdown
      })
    ); // close loop
  }; // close fxn

  // Return component
  return (
    <>
      {/** IF IS CMS */}
      {isCms ? (
        /*************
          CMS PAGE
        ***************/
        <nav className="sticky top-0 z-10 px-6 py-4 bg-white border-b border-gray-200">
          {/** NAV LINKS CONTAINER */}
          <div className="flex items-center justify-between">
            {/** Logo icon */}
            <LogoIcon />

            {/** ICONS */}
            <div className="flex items-center relative gap-5">
              {/** Normal icons */}
              {/* <CustomButton
                isLink
                href="/"
                styleBtn="text-gray-500 mr-4 hover:text-gray-700 focus:text-gray-700"
              >
                <AiFillShopping size={24} />
              </CustomButton> */}

              {/** Profile icon */}
              <ProfileIcon userAvatar={userAvatar} />

              {/** Toggle menu button */}
              <ToggleMenuBtn isToggle={toggleMenu} onClick={handleToggleMenu} />
            </div>
          </div>
        </nav>
      ) : (
        /*************
          NORMAL PAGE
        ***************/
        <nav className="px-6 py-3 border-b border-gray-200 bg-white sticky top-0 z-50">
          {/** LINK CONTAINER */}
          <div className="flex items-center justify-between">
            {/** COL 1 - LOGO */}
            <LogoIcon />

            {/** COL 2 - LARGE SCREEN LINKS */}
            <div className="flex items-center space-x-6 text-black">
              {/** Nav links */}
              <div className="hidden space-x-6 md:flex">
                {handleShowNavLinks()}
              </div>

              {/** Login button */}
              {/** If userID, show profile icon else login button */}
              {userID ? (
                <ProfileIcon />
              ) : (
                <CustomButton
                  isLink
                  id="menuBtn"
                  href="/login"
                  styleBtn={`hidden md:block ${twStyles?.btnPrimary}`}
                >
                  Login
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
              className="absolute left-6 right-6 z-50 flex flex-col items-center self-end py-8 mt-6 text-black font-bold space-y-6 bg-white drop-shadow-md sm:w-auto sm:self-center md:hidden"
            >
              {/** Nav links */}
              {handleShowNavLinks()}

              {/** Buttons */}
              {!userID && (
                <div className="w-full text-center px-4">
                  {/** Login */}
                  <CustomButton
                    isLink
                    id="loginBtnSmallScreen"
                    href="/login"
                    styleBtn={`w-full my-3 ${twStyles?.btnPrimary}`}
                  >
                    Login
                  </CustomButton>
                  {/** Register */}
                  <CustomButton
                    isLink
                    id="registerBtnSmallScreen"
                    href="/register"
                    styleBtn={`w-full ${twStyles?.btnSecondary}`}
                  >
                    Register
                  </CustomButton>
                </div>
              )}
            </div>
          )}
        </nav>
      )}
    </>
  ); // close return
}; // close component

// Export
export default PageHeader;
