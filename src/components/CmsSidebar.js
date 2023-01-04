// Import resources
import React from "react";
import { useRecoilState } from "recoil";
import { AiOutlineSetting } from "react-icons/ai";
import { BsSpeedometer2 } from "react-icons/bs";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";
import useAppSettings from "../hooks/useAppSettings";
import CustomDivider from "./CustomDivider";
import CmsRoleLinks from "./CmsRoleLinks";
import { toggleMenuAtom } from "../recoil/atoms";
import { adminCmsLinks, userCmsLinks } from "../config/data";

// Component
const CmsSidebar = ({ userRole }) => {
  // Define app settings
  const { currPath } = useAppSettings();

  // Define state
  const [toggleMenu, setToggleMenu] = useRecoilState(toggleMenuAtom);

  // Debug
  //console.log("Debug cmsSidebar: ", toggleMenu);

  // FUNCTIONS
  // HANDLE CLOSE SIDEBAR
  const handleCloseSidebar = () => {
    setToggleMenu(false);
  }; // close fxn

  // HANDLE SHOW ROLE LINKS
  const handleShowRoleLinks = () => {
    // If no args, return
    if (!userRole) return;
    // Switch user role
    switch (userRole) {
      case "admin":
        return (
          <CmsRoleLinks
            currPath={currPath}
            data={adminCmsLinks}
            onClickCmsLink={handleCloseSidebar}
          />
        ); // close return
      default:
        return (
          <CmsRoleLinks
            currPath={currPath}
            data={userCmsLinks}
            onClickCmsLink={handleCloseSidebar}
          />
        ); // close return
    } // close switch
  }; // close fxn

  // Return component
  return (
    <div
      className={`
        ${!toggleMenu && "hidden"} 
        fixed w-60 h-full z-10 shadow-lg bg-white overflow-auto md:block
      `}
    >
      {/** SIDEBAR LINKS */}
      <ul className="list-none mt-3 px-1 relative">
        {/** Dashboard */}
        <li
          id="normalCmsNavLink"
          className="relative"
          onClick={handleCloseSidebar}
        >
          <CustomButton
            isLink
            href="/cms"
            styleBtn={`
              flex items-center text-base text-gray-700 text-ellipsis py-4 px-6 h-12 no-underline overflow-hidden whitespace-nowrap rounded hover:text-primary transition duration-300 ease-in-out
              ${currPath === "/cms" && "!text-primary"}
            `}
          >
            {/** Icon */}
            <BsSpeedometer2 className={tw?.cmsNavIconLeft} />
            {/** Title */}
            <span>Dashboard</span>
          </CustomButton>
        </li>

        {/** Show role links */}
        {handleShowRoleLinks()}

        {/** Divider */}
        <CustomDivider />

        {/** Settings */}
        <li
          id="normalCmsNavLink"
          className="relative mb-24"
          onClick={handleCloseSidebar}
        >
          <CustomButton
            isLink
            href="/cms/settings"
            styleBtn={`
              flex items-center text-base text-gray-700 text-ellipsis py-4 px-6 h-12 no-underline overflow-hidden whitespace-nowrap rounded hover:text-primary transition duration-300 ease-in-out
              ${currPath === "/cms/settings" && "!text-primary"}
            `}
          >
            {/** Icon */}
            <AiOutlineSetting className={tw?.cmsNavIconLeft} />
            {/** Title */}
            <span>Settings</span>
          </CustomButton>
        </li>
      </ul>

      {/** SIDEBAR FOOTER */}
      {/* <div className="absolute w-full bottom-0 text-center">
        <hr className="m-0" />
        <p className="pt-2 pb-4 text-sm text-gray-700">tailwind-elements.com</p>
      </div> */}
    </div>
  ); // close return
}; // close component

// Export
export default CmsSidebar;
