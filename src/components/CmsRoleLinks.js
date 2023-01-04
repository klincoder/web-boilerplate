// Import resources
import React from "react";
import { IoIosArrowDown } from "react-icons/io";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";

// Component
const CmsRoleLinks = ({ data, currPath, onClickCmsLink }) => {
  // Debug
  //console.log("Debug cmsRoleLinks: ", currPath);

  // Return component
  return (
    <>
      {/** IF DATA LEN */}
      {data?.length > 0 &&
        data?.map((item, index) => {
          // Define variables
          const itemID = `roleLinks${index}`;
          const itemTitle = item?.title;
          const itemLink = item?.link;
          const itemLeftIcon = item?.leftIcon;
          const isActive = item?.status === "active";
          const isDropdown = item?.isDropdown;
          const isCurrPath = item?.linksArr?.includes(currPath);

          // If isActive
          if (isActive) {
            // If isDropdown
            if (isDropdown) {
              const dropdownArr = item?.options;
              const dropdownLinks = dropdownArr?.map((obj) => obj?.link);
              const dropdownIsCurrPath = dropdownLinks?.includes(currPath);
              //console.log("Debug CmsroleLinks: ", dropdownArr);
              // Return list
              return (
                <li key={itemID} id={`cmsLink${itemID}`} className="relative">
                  {/** DROPDOWN TITLE */}
                  <CustomButton
                    isLink
                    href="#"
                    aria-expanded="false"
                    aria-controls="collapseCmsNavLink"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseCmsNavLink${itemID}`}
                    styleBtn={`
                      flex items-center text-base text-gray-700 text-ellipsis py-4 px-6 h-12 no-underline rounded cursor-pointer overflow-hidden whitespace-nowrap hover:text-primary transition duration-300 ease-in-out
                      ${isCurrPath && "!text-primary"} 
                    `}
                  >
                    {/** Icon */}
                    {itemLeftIcon}
                    {/** Title */}
                    <span>{itemTitle}</span>
                    {/** Caret icon */}
                    <IoIosArrowDown className="w-3 h-3 ml-auto" />
                  </CustomButton>

                  {/** DROPDOWN LINKS */}
                  <ul
                    id={`collapseCmsNavLink${itemID}`}
                    aria-labelledby="cmsNavLink"
                    data-bs-parent="#cmsSidebar"
                    className="list-none relative accordion-collapse collapse p-0"
                  >
                    {/** Loop dropdownArr */}
                    {dropdownArr?.length > 0 &&
                      dropdownArr?.map((opt, optIndex) => {
                        // Define variables
                        const isShopOpt = opt?.isShop;
                        const optTitle = opt?.title;
                        const optLink = opt?.link;
                        const isCurrPathOpt = currPath === optLink;
                        // Return
                        return (
                          <li
                            key={optTitle}
                            className="relative"
                            onClick={onClickCmsLink}
                          >
                            <CustomButton
                              isLink
                              href={optLink}
                              target={isShopOpt ? "_blank" : "_self"}
                              styleBtn={`
                                flex items-center text-sm text-gray-700 text-ellipsis py-4 pl-12 pr-6 h-6 no-underline overflow-hidden whitespace-nowrap rounded hover:text-primary transition duration-300 ease-in-out
                                ${isCurrPathOpt && "!text-primary"} 
                              `}
                            >
                              {/** Title */}
                              {optTitle}
                            </CustomButton>
                          </li>
                        );
                      })}
                  </ul>
                </li>
              ); // close return
            } else {
              return (
                <li
                  key={itemID}
                  id={`"cmsNavLink${itemID}`}
                  className="relative"
                  onClick={onClickCmsLink}
                >
                  <CustomButton
                    isLink
                    href={itemLink}
                    styleBtn={`
                      flex items-center text-base text-gray-700 text-ellipsis py-4 px-6 h-12 no-underline overflow-hidden whitespace-nowrap rounded hover:text-primary transition duration-300 ease-in-out
                      ${isCurrPath && "!text-primary"} 
                    `}
                  >
                    {/** Icon */}
                    {itemLeftIcon}
                    {/** Title */}
                    <span>{itemTitle}</span>
                  </CustomButton>
                </li>
              ); // close return
            } // close if
          } // close if
        })}
    </>
  ); // close return
}; // close component

// Export
export default CmsRoleLinks;
