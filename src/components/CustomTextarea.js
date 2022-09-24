// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";
import CustomHelperText from "./CustomHelperText";

// Component
const CustomTextarea = ({
  name,
  label,
  rows,
  placeholder,
  divClass,
  inputClass,
  helperText,
  errName,
  errTouched,
  ...rest
}) => {
  // Debug
  //console.log("Debug customTextarea: ",)

  // Return component
  return (
    <div className={`mb-4 xl:w-96 ${divClass}`}>
      {/** Label */}
      {label && (
        <label
          htmlFor={name}
          className="form-label inline-block text-sm font-bold mb-1"
        >
          {label}
        </label>
      )}

      {/** Input */}
      <textarea
        {...rest}
        id={name}
        name={name}
        rows={"3" || rows}
        placeholder={label || placeholder}
        className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-secondary focus:outline-none ${inputClass}`}
      ></textarea>

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
export default CustomTextarea;
