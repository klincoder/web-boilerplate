// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";

// Component
const CustomPagination = ({ divClass, data, onPrevPage, onNextPage }) => {
  // Debug
  //console.log("Debug customPagination: ",)

  // Return component
  return (
    <div className={`flex ${divClass}`}>
      {/** Nav */}
      <nav aria-label="page navigation example">
        {/** Links */}
        <ul className="flex list-none p-0">
          {/** Next button */}
          <li className="page-item">
            <CustomButton
              isNormal
              btnClass={tw?.btnPaginator}
              disabled={!data?.prevPage}
              onClick={onPrevPage}
            >
              Previous
            </CustomButton>
          </li>
          {/** Page count */}
          <li className="page-item">
            <span className="page-link relative block text-gray-800 py-1.5 px-3 border-0 bg-transparent">
              {`${data?.page} / ${data?.totalPages}`}
            </span>
          </li>
          {/** Next button */}
          <li className="page-item">
            <CustomButton
              isNormal
              btnClass={tw?.btnPaginator}
              disabled={!data?.nextPage}
              onClick={onNextPage}
            >
              Next
            </CustomButton>
          </li>
        </ul>
      </nav>
    </div>
  ); // close return
}; // close component

// Export
export default CustomPagination;
