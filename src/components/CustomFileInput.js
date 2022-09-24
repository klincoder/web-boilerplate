// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";
import CustomHelperText from "./CustomHelperText";

// Component
const CustomFileInput = ({
  name,
  label,
  type,
  placeholder,
  divClass,
  inputClass,
  helperText,
  errName,
  errTouched,
  ...rest
}) => {
  // Debug
  //console.log("Debug customFileInput: ",)

  // Return component
  return (
    <div className={`${divClass}`}>
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
      <input
        {...rest}
        type="file"
        id={name}
        name={name}
        placeholder={label || placeholder}
        className={`form-control block w-full px-3 py-1.5 m-0 text-base font-normal rounded text-gray-700 bg-white bg-clip-padding border border-gray-300 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none disabled:opacity-60 disabled:pointer-events-none transition ease-in-out ${inputClass}`}
      />

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
export default CustomFileInput;
