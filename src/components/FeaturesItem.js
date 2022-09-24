// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";
import CustomImage from "./CustomImage";

// Component
function FeaturesItem({ rowData, rowIndex, divClass }) {
  // Define row data info
  const rowID = rowData?.id;
  const rowTitle = rowData?.title;
  const rowImage = rowData?.image;
  const rowDesc = rowData?.description;

  // Debug
  //console.log("Debug featuresItem: ",)

  // Return component
  return (
    <div className="bg-white p-6 mb-12 rounded-xl shadow-lg text-center">
      {/* <div className="inline-block bg-primary p-2 mb-6 rounded-full shadow-lg"> */}
      {/** Image */}
      <CustomImage image={rowImage} alt={rowTitle} width={60} height={60} />
      {/* </div> */}

      {/** Title */}
      <h5 className="text-lg font-bold mb-4">{rowTitle}</h5>

      {/** Description */}
      <p className="text-gray-500">{rowDesc}</p>
    </div>
  ); // close return
} // close component

// Export
export default FeaturesItem;
