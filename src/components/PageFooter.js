// Import resources
import React from "react";
import moment from "moment";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";
import useAppSettings from "../hooks/useAppSettings";
import { copyrightLinks } from "../config/data";

// Component
const PageFooter = () => {
  // Define app settings
  const { siteInfo, currPath } = useAppSettings();

  // Debug
  //console.log("Debug pagefooter: ",)

  // Return component
  return (
    <footer className="bg-secondary">
      {/** MAIN CONTAINER */}
      <div className="container mx-auto flex flex-col items-center px-6 py-8 space-y-2">
        {/** COL 1 */}
        <div className="flex flex-row items-center gap-3 max-w-lg">
          {/** Copyright links */}
          {copyrightLinks?.length > 0 &&
            copyrightLinks?.map((item) => (
              <div key={item?.id} className="text-white">
                <CustomButton isLink href={item?.link}>
                  <a
                    className={`
                      text-white hover:text-primary
                      ${currPath === item?.link && "!text-primary"}
                    `}
                  >
                    {item?.title}
                  </a>
                </CustomButton>
              </div>
            ))}
        </div>

        {/** COL 2 - COPYRIGHT */}
        <div className="text-base text-white">
          Copyright &copy;{" "}
          {`${moment().format("YYYY")} ${siteInfo?.copyrightName}`}
        </div>
      </div>
    </footer>
  ); // close return
}; // close component

// Export
export default PageFooter;
