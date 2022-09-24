// Import resources
import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// Import custom files
import tw from "../styles/twStyles";
import CustomHelperText from "./CustomHelperText";

// Component
const CustomPassword = ({
  name,
  label,
  showPass,
  onShowPass,
  divClass,
  inputClass,
  helperText,
  errName,
  errTouched,
  placeholder,
  isRequired,
  ...rest
}) => {
  // Debug
  //console.log("Debug customPassword: ",)

  // Return component
  return (
    <div className={`mb-4 ${divClass}`}>
      {/** Label */}
      {label && (
        <label
          htmlFor={name}
          className="form-label inline-block text-sm font-semibold mb-1"
        >
          {label}
        </label>
      )}

      {/** Input container */}
      <div className="flex items-center bg-white">
        {/** Input */}
        <input
          {...rest}
          name={name}
          type={showPass ? "text" : "password"}
          placeholder={label || placeholder}
          className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-r-0 border-solid border-gray-300 rounded-l transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-secondary focus:outline-none placeholder:text-gray-400 ${inputClass}`}
        />

        {/** Toggle password button */}
        <div
          className="p-1.5 border border-l-0 border-solid border-gray-300 rounded-r cursor-pointer focus:outline-none"
          onClick={onShowPass}
        >
          {showPass ? (
            <AiOutlineEyeInvisible size={24} className="text-gray-600" />
          ) : (
            <AiOutlineEye size={24} className="text-gray-600" />
          )}
        </div>
      </div>

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
export default CustomPassword;
