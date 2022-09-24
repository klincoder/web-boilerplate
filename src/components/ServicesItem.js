// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";
import CustomImage from "./CustomImage";
import { appImages, currSymbol } from "../config/data";

// Component
const ServicesItem = ({ rowData, index, divClass }) => {
  // Define row data info
  const rowID = rowData?.id;
  const rowTitle = rowData?.title;
  const rowImage = rowData?.image;
  const rowLink = rowData?.link;
  const rowDesc = rowData?.description;

  // Debug
  //console.log("Debug servicesItem: ",)

  // Return component
  return (
    <div className={`mb-20 text-center ${divClass}`}>
      <div className="rounded-lg shadow-lg h-full block bg-white">
        {/** Button */}
        <CustomButton isLink href={rowLink}>
          <a className="no-underline">
            {/** Header */}
            <div className="flex justify-center">
              {/** Image */}
              <div className="-mt-8">
                <CustomImage
                  image={rowImage || appImages?.general}
                  alt={rowTitle}
                  imgClass="rounded-lg"
                  width={60}
                  height={60}
                />
              </div>
            </div>

            {/** Body */}
            <div className="p-6">
              {/** Title */}
              <h5 className="text-2xl font-semibold text-gray-800 mb-4">
                {rowTitle}
              </h5>

              {/** Description */}
              <p className="text-gray-500">{rowDesc}</p>

              {/** Button */}
              <div className={tw?.btnPrimary}>Learn more</div>
            </div>
          </a>
        </CustomButton>
      </div>
    </div>
  ); // close return
}; // close component

// Export
export default ServicesItem;
