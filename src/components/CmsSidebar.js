// Import resources
import React from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { BsSpeedometer2 } from "react-icons/bs";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";
import useAppSettings from "../hooks/useAppSettings";
import CustomDivider from "./CustomDivider";
import CmsRoleLinks from "./CmsRoleLinks";
import { toggleCmsMenuAtom } from "../recoil/atoms";
import { adminCmsLinks, userCmsLinks } from "../config/data";

// Component
const CmsSidebar = ({ userRole }) => {
  // Define state
  const [toggleMenu, setToggleMenu] = useRecoilState(toggleCmsMenuAtom);

  // Define app settings
  const { todaysDate } = useAppSettings();

  // Define router
  const router = useRouter();
  const currPath = router.pathname;

  // Debug
  // console.log("Debug cmsSidebar: ", );

  // FUNCTIONS
  // HANDLE CLOSE SIDEBAR
  const handleCloseSidebar = () => {
    // Set state
    setToggleMenu(false);
  }; // close fxn

  // HANDLE ROLE LINKS
  const handleRoleLinks = () => {
    // If no args, return
    if (!userRole) return;
    // Switch user role
    switch (userRole) {
      case "admin":
        return (
          <CmsRoleLinks
            data={adminCmsLinks}
            currPath={currPath}
            onClickCmsLink={handleCloseSidebar}
          />
        ); // close return
      default:
        return (
          <CmsRoleLinks
            data={userCmsLinks}
            currPath={currPath}
            onClickCmsLink={handleCloseSidebar}
          />
        ); // close return
    } // close switch
  }; // close fxn

  // Return component
  return (
    <div
      id="cmsSidebar"
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
          <CustomButton isLink href="/cms">
            <a
              className={`
                flex items-center text-base text-gray-700 text-ellipsis py-4 px-6 h-12 no-underline overflow-hidden whitespace-nowrap rounded hover:text-primary transition duration-300 ease-in-out
                ${currPath === "/cms" && "!text-primary"}
              `}
            >
              {/** Icon */}
              <BsSpeedometer2 className={tw?.cmsNavIconLeft} />
              {/** Title */}
              <span>Dashboard</span>
            </a>
          </CustomButton>
        </li>

        {/** Cms role links */}
        {handleRoleLinks()}

        {/** Divider */}
        <CustomDivider />

        {/** Settings */}
        <li
          id="normalCmsNavLink"
          className="relative mb-24"
          onClick={handleCloseSidebar}
        >
          <CustomButton isLink href="/cms/settings">
            <a
              className={`
                flex items-center text-base text-gray-700 text-ellipsis py-4 px-6 h-12 no-underline overflow-hidden whitespace-nowrap rounded hover:text-primary transition duration-300 ease-in-out
                ${currPath === "/cms/settings" && "!text-primary"}
            `}
            >
              {/** Icon */}
              <AiOutlineSetting className={tw?.cmsNavIconLeft} />
              {/** Title */}
              <span>Settings</span>
            </a>
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
