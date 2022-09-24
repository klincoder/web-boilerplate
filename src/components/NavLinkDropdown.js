// Import resources
import React from "react";
import { IoIosArrowDown } from "react-icons/io";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";

// Component
const NavLinkDropdown = ({ title, data, currPath }) => {
  // Get links array from navLinksArr
  const linkArr = data?.map((obj) => {
    return obj?.link;
  });
  const linkSlugArr = data?.map((obj) => {
    return obj?.linkSlug;
  });

  // Define isCurrPath
  const isCurrPath = linkArr?.includes(currPath);
  const isCurrPathDropdown = linkSlugArr?.includes(currPath);
  const isActiveDropdown = isCurrPath || isCurrPathDropdown;

  // Debug
  //console.log("Debug navLinkDropdown: ", isActiveDropdown);

  // Return component
  return (
    <div className="dropdown relative">
      {/** Dropwdown title */}
      <CustomButton isLink href="/#">
        <a
          data-bs-toggle="dropdown"
          aria-expanded="false"
          className={`
            dropdown-toggle flex items-center gap-1 text-gray-700 no-underline -mr-1
            ${isActiveDropdown && "!text-primary"} 
          `}
        >
          {/** Title */}
          {title || "Dropdown Title"}
          {/** Caret icon */}
          <IoIosArrowDown className="w-3 h-3" />
        </a>
      </CustomButton>

      {/** Dropdown links */}
      <ul className="list-none dropdown-menu hidden absolute z-50 min-w-max text-base text-left p-0 py-2 mt-1 m-0 bg-white float-left border-none rounded-lg shadow-lg bg-clip-padding">
        {/** Loop data */}
        {data?.length > 0 &&
          data?.map((item, index) => (
            <li key={`dropdownList${index + 1}`}>
              <CustomButton isLink href={item?.link}>
                <a
                  className={`
                    dropdown-item text-sm text-gray-600 py-2 px-4 font-normal no-underline block w-full whitespace-nowrap bg-transparent hover:text-primary focus:text-primary
                    ${currPath === item?.link && "!text-primary"}
                    ${currPath === item?.linkSlug && "!text-primary"}
                  `}
                >
                  {item?.title}
                </a>
              </CustomButton>
            </li>
          ))}
      </ul>
    </div>
  ); // close return
}; // close component

// Export
export default NavLinkDropdown;
