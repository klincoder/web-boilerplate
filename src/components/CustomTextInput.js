// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";
import CustomHelperText from "./CustomHelperText";

// Component
const CustomTextInput = ({
  label,
  name,
  type,
  divClass,
  inputClass,
  helperText,
  errName,
  errTouched,
  placeholder,
  ...rest
}) => {
  // Debug
  //console.log("Debug customTextInput: ",)

  // Return component
  return (
    <div className={`xl:w-96 ${divClass}`}>
      {/** Label */}
      {label && (
        <label
          htmlFor={name}
          className="form-label inline-block text-sm font-bold mb-1 w-full"
        >
          {label}
        </label>
      )}

      {/** Input */}
      <input
        {...rest}
        name={name}
        type={type || "text"}
        placeholder={placeholder}
        className={`${inputClass} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-secondary focus:outline-none placeholder:text-gray-400 disabled:opacity-60 disabled:pointer-events-none disabled:bg-gray-50`}
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
export default CustomTextInput;
