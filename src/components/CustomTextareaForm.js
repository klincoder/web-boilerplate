// Import resources
import React from "react";
import { Field } from "formik";

// Import custom files
import tw from "../styles/twStyles";
import CustomHelperText from "./CustomHelperText";

// Component
const CustomTextareaForm = ({
  name,
  label,
  labelRight,
  rows,
  value,
  placeholder,
  divClass,
  inputClass,
  helperText,
  isRequired,
  ...rest
}) => {
  // Debug
  //console.log("Debug customTextareaForm: ",)

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

            {/** Textarea */}
            <textarea
              {...rest}
              id={name}
              name={name}
              rows={rows || "3"}
              placeholder={placeholder || label}
              value={value || field.value}
              onChange={(e) => form.setFieldValue(name, e.target.value)}
              className={`
                ${inputClass} 
                ${meta.touched && meta.error && "is-invalid"}
                form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-secondary focus:outline-none placeholder:text-gray-400 disabled:opacity-60 disabled:pointer-events-none disabled:bg-gray-50
              `}
            ></textarea>

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
export default CustomTextareaForm;
