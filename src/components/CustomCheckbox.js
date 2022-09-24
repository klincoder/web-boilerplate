// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";
import CustomHelperMsg from "./CustomHelperMsg";

// Component
const CustomCheckbox = ({
  label,
  name,
  data,
  divClass,
  inputClass,
  helperMsg,
  errName,
  errTouched,
  checkedVal,
  ...rest
}) => {
  // Debug
  //console.log("Debug customCheckbox: ",)

  // Return component
  return (
    <div className={`mb-4 ${divClass}`}>
      {/** Label */}
      {label && (
        <label htmlFor={name} className="block text-sm font-semibold mb-1 mr-3">
          {label}
        </label>
      )}

      {/** Loop data */}
      {data?.length > 0 &&
        typeof data === "object" &&
        data?.map((item, index) => (
          <div key={item} className="form-check form-check-inline">
            {/** Input */}
            <input
              {...rest}
              type="checkbox"
              id={item}
              value={item}
              name={`${name}[${index}]`}
              className={`form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-primary checked:border-primary focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer ${inputClass}`}
            />
            {/** Label */}
            <label
              htmlFor={item}
              className="form-check-label inline-block text-gray-800 cursor-pointer text-sm"
            >
              {item}
            </label>
            {/** Debug */}
            {/* {console.log(
              "Debug checkboxGetIndex: ",
              `${name}[${index}]`
            )} */}
          </div>
        ))}

      {/** Helper msg */}
      {helperMsg && <CustomHelperMsg visible={helperMsg} title={helperMsg} />}

      {/** Error msg */}
      <CustomHelperMsg isError title={errName} visible={errTouched} />
    </div>
  ); // close return
}; // close component

// Export
export default CustomCheckbox;
