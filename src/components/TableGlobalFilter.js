// Import resources
import React from "react";
import { FaSearch } from "react-icons/fa";

// Component
const TableGlobalFilter = (props) => {
  // Define props
  const { filter, setFilter, divClass, inputClass, ...rest } = props;

  // Return component
  return (
    <div className="flex flex-row items-center gap-3 mb-3 pl-3 bg-gray-50">
      {/** Icon */}
      <span>
        <FaSearch size={20} className="text-gray-500" />
      </span>

      {/** Input */}
      <input
        {...rest}
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-secondary focus:outline-none placeholder:text-gray-400 disabled:opacity-60 disabled:pointer-events-none disabled:bg-gray-50 ${inputClass}`}
      />
    </div>
  ); // close return
}; // close component

// Export
export default TableGlobalFilter;
