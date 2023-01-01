// Import resources
import React from "react";
import { Controller } from "react-hook-form";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

// Import custom files
import twStyles from "../styles/twStyles";
import CustomHelperText from "../components/CustomHelperText";

// Component
const CustomInput = ({
  name,
  control,
  label,
  type,
  placeholder,
  showPass,
  onShowPass,
  helperText,
  styleContainer,
  styleInput,
  ...rest
}) => {
  // Define variables
  const isPassType = type === "password";

  // Debug
  //console.log("Debug customInput: ",)

  // Return component
  return (
    <div className={`xl:w-96 ${styleContainer || "mb-3"}`}>
      {/** Label */}
      {label && (
        <label
          htmlFor={name}
          className="form-label inline-block text-sm font-bold mb-1 w-full"
        >
          {label}
        </label>
      )}

      {/** Controller */}
      <Controller
        name={name}
        control={control}
        render={({
          field: { value, ref, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <div className={isPassType ? "flex items-center bg-white" : ""}>
              {/** Input */}
              <input
                {...rest}
                ref={ref}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                type={isPassType ? (showPass ? "text" : "password") : type}
                placeholder={placeholder || `Enter ${label?.toLowerCase()}`}
                className={`
                  ${styleInput} ${error ? "is-invalid" : ""} 
                  form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-secondary focus:outline-none placeholder:text-gray-400 disabled:opacity-60 disabled:pointer-events-none disabled:bg-gray-50
                `}
              />

              {/** If isPassType */}
              {isPassType && (
                <div
                  className="p-1.5 border border-l-0 border-solid border-gray-300 rounded-r cursor-pointer focus:outline-none"
                  onClick={onShowPass}
                >
                  {showPass ? (
                    <AiOutlineEyeInvisible size={24} />
                  ) : (
                    <AiOutlineEye size={24} />
                  )}
                </div>
              )}
            </div>

            {/** Helper text */}
            <CustomHelperText visible={helperText} title={helperText} />

            {/** Error msg */}
            <CustomHelperText isError visible={error} title={error?.message} />
          </>
        )}
      />
    </div>
  ); // close return
}; // close component

// Export
export default CustomInput;
