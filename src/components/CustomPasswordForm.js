// Import resources
import React from "react";
import { Field } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// Import custom files
import tw from "../styles/twStyles";
import CustomHelperText from "./CustomHelperText";

// Component
const CustomPasswordForm = ({
  name,
  label,
  labelRight,
  value,
  placeholder,
  showPass,
  onShowPass,
  divClass,
  inputClass,
  helperText,
  isRequired,
  ...rest
}) => {
  // Debug
  //console.log("Debug customPasswordForm: ", touched);

  // Return component
  return (
    <Field name={name}>
      {({ form, field, meta }) => {
        // Debug
        //console.log("Debug textInputForm: ", field);
        // Return custom field
        return (
          <div className={`mb-4 xl:w-96 ${divClass}`} {...field}>
            {/** Label */}
            {label && (
              <div>
                <label
                  htmlFor={name}
                  className="form-label inline-block text-sm font-bold mb-1"
                >
                  {label}
                  {isRequired && (
                    <span className="text-danger pl-1 font-bold">*</span>
                  )}
                </label>
                {/** Label right */}
                {labelRight && labelRight}
              </div>
            )}

            {/** Input container */}
            <div className="flex items-center bg-white">
              {/** Input */}
              <input
                {...rest}
                name={name}
                type={showPass ? "text" : "password"}
                value={value || field.value}
                onChange={(e) => form.setFieldValue(name, e.target.value)}
                placeholder={placeholder || label}
                className={`
                  ${inputClass}
                  form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-r-0 border-solid border-gray-300 rounded-l transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-secondary focus:outline-none placeholder:text-gray-400
                `}
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
            <CustomHelperText
              isError
              title={meta.error}
              visible={meta.touched}
            />
          </div>
        ); // close return
      }}
    </Field>
  ); // close return
}; // close component

// Export
export default CustomPasswordForm;
