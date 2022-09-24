// Import resources
import React from "react";
import { Field } from "formik";

// Import custom files
import tw from "../styles/twStyles";
import CustomHelperText from "./CustomHelperText";

// Component
const CustomRadioForm = ({
  name,
  label,
  data,
  inputClass,
  divClass,
  helperText,
  ...rest
}) => {
  // Debug
  //console.log("Debug customRadioForm: ", name, values[name]);

  // Return component
  return (
    <Field name={name}>
      {({ form, field, meta }) => {
        // Return custom field
        return (
          <div className={`mb-4 xl:w-96 ${divClass}`} {...field}>
            {/** Label */}
            {label && (
              <label
                htmlFor={name}
                className="block text-sm font-bold mb-1 mr-3"
              >
                {label}
              </label>
            )}

            {/** Input */}
            {/** Loop data */}
            {data?.length > 0 &&
              data?.map((item, index) => (
                <div
                  key={item + index}
                  className="form-check form-check-inline"
                >
                  {/** Input */}
                  <input
                    {...rest}
                    type="radio"
                    id={name + index}
                    name={name}
                    value={item}
                    onChange={() => form.setFieldValue(name, item)}
                    className={`
                      ${inputClass} 
                      ${meta.touched && meta.error && "is-invalid"} 
                      form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary checked:border-primary checked:disabled:bg-lightPrimary disabled:bg-gray-400 disabled:pointer-events-none disabled:opacity-60 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer
                    `}
                  />
                  {/** Label */}
                  <label
                    htmlFor={name + index}
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
export default CustomRadioForm;
