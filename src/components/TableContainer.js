// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";

// Component
const TableContainer = ({ children, ...rest }) => {
  // Debug
  //console.log("Debug tableContainer: ",)

  // Return component
  return (
    <div className="bg-white py-6 mb-8 shadow-lg overflow-x-auto">
      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div className="overflow-hidden">
          {/** Children */}
          {children}
        </div>
      </div>
    </div>
  ); // close return
}; // close component

// Export
export default TableContainer;
