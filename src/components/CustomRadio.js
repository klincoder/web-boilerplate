// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";
import CustomHelperText from "./CustomHelperText";

// Component
const CustomRadio = ({
  label,
  name,
  data,
  divClass,
  inputClass,
  helperText,
  errName,
  errTouched,
  checkedVal,
  ...rest
}) => {
  // Debug
  //console.log("Debug customRadio: ",)

  // Return component
  return (
    <div className={`mb-4 ${divClass}`}>
      {/** Label */}
      {label && (
        <label htmlFor={name} className="block text-sm font-bold mb-1 mr-3">
          {label}
        </label>
      )}

      {/** Input */}
      {/** Loop data */}
      {data?.length > 0 &&
        data?.map((item, index) => (
          <div key={item + index} className="form-check form-check-inline">
            {/** Input */}
            <input
              {...rest}
              type="radio"
              id={item}
              name={name}
              value={item}
              className={`form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary checked:border-primary checked:disabled:bg-lightPrimary disabled:bg-gray-400 disabled:pointer-events-none disabled:opacity-60 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer ${inputClass}`}
            />
            {/** Label */}
            <label
              htmlFor={item}
              className="form-check-label inline-block text-gray-800 cursor-pointer text-sm"
            >
              {item}
            </label>
          </div>
        ))}

      {/** Helper msg */}
      {helperText && (
        <CustomHelperText visible={helperText} title={helperText} />
      )}

      {/** Error msg */}
      <CustomHelperText isError title={errName} visible={errTouched} />
    </div>
  ); // close return
}; // close component

// Export
export default CustomRadio;
