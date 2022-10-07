// Import resources
import React from "react";
import moment from "moment";

// Import custom files
import tw from "../styles/twStyles";
import useAppSettings from "../hooks/useAppSettings";

// Component
const CmsFooter = () => {
  // Define app settings
  const { siteInfo } = useAppSettings();

  // Debug
  //console.log("Debug cmsFooter: ",)

  // Return component
  return (
    <footer className="relative w-full">
      {/** CONTAINER */}
      <div className="px-6 py-4">
        {/** Copyright */}
        <div className="text-center text-sm">
          Copyright &copy;{" "}
          {`${moment.utc().format("YYYY")} ${siteInfo?.copyrightName}`}
        </div>
      </div>
    </footer>
  ); // close return
}; // close component

// Export
export default CmsFooter;
