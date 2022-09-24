// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";
import CustomHelperText from "./CustomHelperText";

// Component
const CustomOtpInput = ({
  name,
  label,
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
  //console.log("Debug customOtpInput: ",)

  // Return component
  return (
    <div className={`mb-4 xl:w-96 ${divClass}`}>
      {/** Label */}
      <div className="text-center mb-3">
        <p className="text-base">
          Enter the OTP code we sent to your email address inbox or spam folder.
        </p>
      </div>

      {/** Input */}
      <input
        {...rest}
        name={name}
        type={"text" || type}
        placeholder={placeholder || "Enter OTP Code"}
        className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-secondary focus:outline-none placeholder:text-gray-400 ${inputClass}`}
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
export default CustomOtpInput;
