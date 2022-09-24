// Import resources
import React from "react";
import { IoIosArrowDown } from "react-icons/io";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";

// Component
const CmsRoleLinks = ({ data, currPath, onClickCmsLink }) => {
  // Debug
  //console.log("Debug cmsroleLinks: ", currPath);

  // Return component
  return (
    <>
      {/** If data?.length > 0 */}
      {data?.length > 0 &&
        data?.map((item, index) => {
          // Define variables
          const itemID = item?.id;
          const itemTitle = item?.title;
          const itemLink = item?.link;
          const itemLeftIcon = item?.leftIcon;
          const isActive = item?.status === "active";
          const isDropdown = item?.isDropdown;

          // If isDropdown
          if (isDropdown) {
            const dropdownArr = item?.options;
            const dropdownLinks = dropdownArr?.map((obj) => obj?.link);
            const dropdownIsCurrPath = dropdownLinks?.includes(currPath);

            // Debug
            //console.log("Debug cmsroleLinks: ", dropdownArr);

            // Return list
            return (
              <li key={itemID} id={`cmsNavLink${itemID}`} className="relative">
                {/** DROPDOWN TITLE */}
                <CustomButton isLink href="#">
                  <a
                    aria-expanded="false"
                    aria-controls="collapseCmsNavLink"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseCmsNavLink${itemID}`}
                    className={`
                      flex items-center text-base text-gray-700 text-ellipsis py-4 px-6 h-12 no-underline rounded cursor-pointer overflow-hidden whitespace-nowrap hover:text-primary transition duration-300 ease-in-out
                      ${dropdownIsCurrPath && "!text-primary"} 
                    `}
                  >
                    {/** Icon */}
                    {itemLeftIcon}
                    {/** Title */}
                    <span>{itemTitle}</span>
                    {/** Caret icon */}
                    <IoIosArrowDown className="w-3 h-3 ml-auto" />
                  </a>
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
                      const isActiveOpt = opt?.status === "active";
                      const isShopOpt = opt?.isShop;
                      const optTitle = opt?.title;
                      const optLink = opt?.link;

                      // If isActiveOpt
                      if (isActiveOpt) {
                        // Return
                        return (
                          <li
                            key={optTitle}
                            className="relative"
                            onClick={onClickCmsLink}
                          >
                            <CustomButton isLink href={optLink}>
                              <a
                                target={isShopOpt ? "_blank" : "_self"}
                                className={`
                                  flex items-center text-sm text-gray-700 text-ellipsis py-4 pl-12 pr-6 h-6 no-underline overflow-hidden whitespace-nowrap rounded hover:text-primary transition duration-300 ease-in-out
                                  ${currPath === optLink && "!text-primary"} 
                                `}
                              >
                                {/** Title */}
                                {optTitle}
                              </a>
                            </CustomButton>
                          </li>
                        );
                      } // close if isActiveOpt
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
                <CustomButton isLink href={itemLink}>
                  <a
                    className={`
                      flex items-center text-base text-gray-700 text-ellipsis py-4 px-6 h-12 no-underline overflow-hidden whitespace-nowrap rounded hover:text-primary transition duration-300 ease-in-out
                      ${currPath === itemLink && "!text-primary"} 
                    `}
                  >
                    {/** Icon */}
                    {itemLeftIcon}
                    {/** Title */}
                    <span>{itemTitle}</span>
                  </a>
                </CustomButton>
              </li>
            ); // close return
          } // close if
        })}
    </>
  ); // close return
}; // close component

// Export
export default CmsRoleLinks;
