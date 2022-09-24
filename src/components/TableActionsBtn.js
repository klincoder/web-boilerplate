// Import resources
import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";

// Component
const TableActionsBtn = ({ isLinkBtn, linkUrl, actionsList }) => {
  // Debug
  //console.log("Debug tableActionsBtn: ",)

  // Return component
  return (
    <>
      {/** If isLinkBtn */}
      {isLinkBtn ? (
        <CustomButton isLink href={linkUrl}>
          <a className="flex flex-col items-center justify-center">
            <AiOutlineEye size={38} className="bg-gray-100 p-2 rounded-full" />
          </a>
        </CustomButton>
      ) : (
        <div className="dropstart relative">
          {/** DROPDOWN TITLE */}
          <CustomButton isLink href="/#">
            <a
              id="servicesNavDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              className={`dropdown-toggle flex flex-col items-center justify-center`}
            >
              {/** Icon */}
              <BsThreeDotsVertical
                size={36}
                className="bg-gray-100 p-2 rounded-full"
              />
            </a>
          </CustomButton>

          {/** DROPDOWN LINKS */}
          <ul className="dropdown-menu list-none hidden absolute z-50 text-base text-left p-0 py-2 m-0 bg-white min-w-max float-left border-none rounded-lg shadow-lg bg-clip-padding">
            {/** Loop actionsList */}
            {actionsList?.length > 0 &&
              actionsList?.map((item) => (
                <li key={item?.id}>
                  <CustomButton isLink href={item?.link}>
                    <a
                      target={item?.isBlankTarget ? "_blank" : "_self"}
                      className={`dropdown-item text-sm text-gray-600 py-1.5 px-4 font-normal no-underline block w-full whitespace-nowrap bg-transparent hover:text-primary focus:text-primary`}
                    >
                      {item?.title}
                    </a>
                  </CustomButton>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  ); // close return
}; // close component

// Export
export default TableActionsBtn;
