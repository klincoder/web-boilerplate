// Import resources
import React from "react";

// Import custom files
import twStyles from "../styles/twStyles";
import useAppSettings from "../hooks/useAppSettings";
import CustomButton from "./CustomButton";
import { copyrightLinks } from "../config/data";
import { handleDayJsFormat } from "../config/functions";

// Component
const PageFooter = ({ isCms, siteInfo }) => {
  // Define app settings
  const { currPath } = useAppSettings();

  // Define variables
  const copyrightYear = handleDayJsFormat(null, 3);

  // Debug
  //console.log("Debug pageFooter: ",)

  // Return component
  return (
    <>
      {/** IF IS CMS */}
      {isCms ? (
        /*************
          CMS PAGE
        ***************/
        <footer className="relative w-full">
          {/** CONTAINER */}
          <div className="px-6 py-4">
            {/** Copyright */}
            <div className="text-center text-sm">
              Copyright &copy; {copyrightYear}{" "}
              <CustomButton
                isLink
                href="/"
                styleBtn={isCms ? "" : "text-white hover:text-primary"}
              >
                {siteInfo?.copyrightName}
              </CustomButton>
            </div>
          </div>
        </footer>
      ) : (
        /**************
          NORMAL PAGE
        ***************/
        <footer className="bg-secondary">
          {/** MAIN CONTAINER */}
          <div className="container mx-auto flex flex-col px-6 py-8">
            {/** COL 1 - WIDGETS */}

            {/** COL 2 - COPYRIGHT */}
            <div className="flex flex-col items-center space-y-2 md:flex-row md:justify-between md:space-y-0">
              {/** Copyright links */}
              <div className="flex flex-row">
                {copyrightLinks?.length > 0 &&
                  copyrightLinks?.map((item) => (
                    <div key={item?.id} className="text-white">
                      <CustomButton
                        isLink
                        href={item?.link}
                        styleBtn={`
                          text-white px-1.5 hover:text-veryLightPrimary
                          ${currPath === item?.link && "!text-veryLightPrimary"}
                        `}
                      >
                        {item?.title}
                      </CustomButton>
                    </div>
                  ))}
              </div>
              {/** Copyright text */}
              <div className="flex flex-row gap-1 text-base text-white">
                Copyright &copy; {copyrightYear}{" "}
                <CustomButton
                  isLink
                  href="/"
                  styleBtn="text-white hover:text-veryLightPrimary"
                >
                  {siteInfo?.copyrightName}
                </CustomButton>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  ); // close return
}; // close component

// Export
export default PageFooter;
