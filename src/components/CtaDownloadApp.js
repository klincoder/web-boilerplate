// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";
import CustomImage from "./CustomImage";
import { appImages } from "../config/data";

// Component
const CtaDownloadApp = ({ rowData }) => {
  // Debug
  //console.log("Debug ctaDownloadApp: ",)

  // Return component
  return (
    <div className="flex flex-row gap-3">
      {/** Android */}
      <CustomButton isLink href="https://play.google.com/store/apps">
        <a target="_blank">
          <CustomImage
            image={appImages?.androidBadge}
            width={150}
            height={45}
            imgClass="rounded-lg"
          />
        </a>
      </CustomButton>

      {/** iOS */}
      <CustomButton isLink href="https://www.apple.com/app-store/">
        <a target="_blank">
          <CustomImage
            image={appImages?.iosBadge}
            width={150}
            height={45}
            imgClass="rounded-lg"
          />
        </a>
      </CustomButton>
    </div>
  ); // close return
}; // close component

// Export
export default CtaDownloadApp;
