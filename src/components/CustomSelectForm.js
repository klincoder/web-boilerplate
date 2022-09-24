// Import resources
import React from "react";
import { Field } from "formik";

// Import custom files
import tw from "../styles/twStyles";
import CustomHelperText from "./CustomHelperText";

// Component
const CustomSelectForm = ({
  name,
  label,
  labelRight,
  data,
  inputClass,
  divClass,
  helperText,
  optionLabel,
  isKeyValue,
  isRequired,
  ...rest
}) => {
  // Debug
  //console.log("Debug customSelectForm: ",)

  // Return component
  return (
    <Field name={name}>
      {({ form, field, meta }) => {
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

            {/** Input */}
            <select
              {...rest}
              id={name}
              name={name}
              value={field.value}
              onChange={(e) => form.setFieldValue(name, e.target.value)}
              className={`
                ${inputClass} 
                ${meta.touched && meta.error && "is-invalid"} 
                form-select form-select-lg appearance-none block w-full pl-4 pr-10 py-2 m-0 text-sm font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-secondary focus:outline-none disabled:opacity-60 disabled:pointer-events-none disabled:bg-gray-100
              `}
            >
              {/** Empty option */}
              <option value="">{optionLabel || `Choose`}</option>
              {/** Loop data */}
              {data?.length > 0 &&
                data?.map((item) => {
                  // If isKeyValue
                  if (isKeyValue) {
                    return (
                      <option key={item?.key} value={item?.value}>
                        {item?.key}
                      </option>
                    ); // close return
                  } else {
                    return (
                      <option key={item} value={item?.toLowerCase()}>
                        {item}
                      </option>
                    ); // close return
                  } // close if
                })}
            </select>

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
export default CustomSelectForm;
