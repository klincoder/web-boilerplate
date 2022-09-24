// Import resources
import React from "react";
import { useRecoilState } from "recoil";

// Import custom files
import tw from "../styles/twStyles";
import LogoIcon from "./LogoIcon";
import ProfileIcon from "./ProfileIcon";
import ToggleMenuBtn from "./ToggleMenuBtn";
import { toggleCmsMenuAtom } from "../recoil/atoms";

// Component
const CmsHeader = () => {
  // Define state
  const [toggleMenu, setToggleMenu] = useRecoilState(toggleCmsMenuAtom);

  // Debug
  //console.log("Debug cmsHeader: ", userAvatar);

  // FUNCTIONS
  // HANDLE TOGGLE MENU
  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  }; // close funx

  // Return component
  return (
    <nav className="sticky top-0 z-10 px-6 py-4 bg-white border-b border-gray-200">
      {/** NAV LINKS CONTAINER */}
      <div className="flex items-center justify-between">
        {/** Logo icon */}
        <LogoIcon />

        {/** ICONS */}
        <div className="flex items-center relative gap-5">
          {/** Normal icons */}
          {/* <CustomButton isLink href="/">
              <a className="text-gray-500 mr-4 hover:text-gray-700 focus:text-gray-700">
                <AiFillShopping size={24} />
              </a>
            </CustomButton> */}

          {/** Notification icon */}
          {/* <div className="dropdown-start relative">
            <a
              role="button"
              id="notificationsIcon"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              className="dropdown-toggle flex items-center hidden-arrow text-gray-500 hover:text-gray-700 focus:text-gray-700"
            >
              <AiFillBell size={24} />
              <span className="text-white bg-primary absolute rounded-full text-xs -mt-2.5 ml-2 py-0 px-1.5">
                {notificationsList?.length}
              </span>
            </a>
            // Dropdown list
            <ul
              aria-labelledby="notificationsIcon"
              className="dropdown-menu min-w-max py-2 mt-1 m-0 absolute hidden bg-white text-base z-50 float-left list-none text-left rounded-lg shadow-lg bg-clip-padding border-none left-auto right-0"
            >
              // Loop notifications list
              {notificationsList?.length > 0 &&
                notificationsList?.map((item, index) => (
                  <li
                    key={item?.id + index}
                    className="dropdown-item py-2 px-4 hover:bg-gray-100"
                  >
                    <p className="text-sm font-normal bg-transparent text-gray-700">
                      <span>{item?.title}</span>
                      <span>{item?.description}</span>
                    </p>
                  </li>
                ))}
            </ul>
          </div> */}

          {/** Profile icon */}
          <ProfileIcon />

          {/** Toggle menu button */}
          <ToggleMenuBtn isToggle={toggleMenu} onClick={handleToggleMenu} />
        </div>
      </div>
    </nav>
  ); // close return
}; // close component

// Export
export default CmsHeader;
