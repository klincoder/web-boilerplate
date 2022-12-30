// Import resources
import React from "react";
import { IoIosArrowDown } from "react-icons/io";

// Import custom files
import twStyles from "../styles/twStyles";
import CustomButton from "./CustomButton";

// Component
const NavLinkItem = ({
  isDropDown,
  title,
  rowData,
  rowDataOpt,
  currPath,
  styleBtn,
  ...rest
}) => {
  // Define variables
  const linkArr = rowDataOpt?.map((i) => i?.link);
  const linkSlugArr = rowDataOpt?.map((i) => i?.linkSlug);
  const isCurrPath = linkArr?.includes(currPath);
  const isCurrPathDropdown = linkSlugArr?.includes(currPath);
  const isActiveDropdown = isCurrPath || isCurrPathDropdown;

  // Debug
  //console.log("Debug navLinkItem: ",)

  // Return component
  return (
    <>
      {/** IS DROPDOWN */}
      {isDropDown ? (
        <div className="dropdown relative">
          {/** Dropwdown title */}
          <CustomButton
            isLink
            href="/#"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            styleBtn={`
              dropdown-toggle flex items-center gap-1 text-gray-700 no-underline -mr-1
              ${isActiveDropdown && "!text-primary"} 
            `}
          >
            {/** Title */}
            {title || "Dropdown Title"}
            {/** Caret icon */}
            <IoIosArrowDown className="w-3 h-3" />
          </CustomButton>

          {/** Dropdown links */}
          <ul className="list-none dropdown-menu hidden absolute z-50 min-w-max text-base text-left p-0 py-2 mt-1 m-0 bg-white float-left border-none rounded-lg shadow-lg bg-clip-padding">
            {/** Loop data */}
            {rowDataOpt?.length > 0 &&
              rowDataOpt?.map((item, index) => (
                <li key={`dropdownList${index + 1}`}>
                  <CustomButton
                    isLink
                    href={item?.link}
                    styleBtn={`
                      dropdown-item text-sm text-gray-600 py-2 px-4 font-normal no-underline block w-full whitespace-nowrap bg-transparent hover:text-primary focus:text-primary
                      ${currPath === item?.link && "!text-primary"}
                      ${currPath === item?.linkSlug && "!text-primary"}
                    `}
                  >
                    {item?.title}
                  </CustomButton>
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <CustomButton
          {...rest}
          isLink
          href={rowData?.link}
          styleBtn={`${styleBtn} no-underline hover:text-primary`}
        >
          {rowData?.title}
        </CustomButton>
      )}
    </>
  ); // close return
}; // close component

// Export
export default NavLinkItem;
