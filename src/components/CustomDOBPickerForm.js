import React, { useState } from "react";
import { Field } from "formik";
import DatePicker from "react-datepicker";

// Import custom files
import "react-datepicker/dist/react-datepicker.css";
import CustomHelperText from "./CustomHelperText";

// Component
const CustomDOBPickerForm = ({
  name,
  label,
  divClass,
  inputClass,
  helperText,
  placeholder,
  errName,
  errTouched,
  isDateTime,
  excludeTime,
  customTimeInput,
  filterTime,
  minTime,
  maxTime,
  minDate,
  maxDate,
  ...rest
}) => {
  // Defien date format
  const dateFormat1 = "MMMM d, yyyy h:mm aa";
  const dateFormat2 = "MMMM d, yyyy";

  // Debug
  //console.log("Debug customDOBPickerForm: ", months);

  // Return component
  return (
    <Field name={name}>
      {({ form, field, meta }) => {
        // Return custom field
        return (
          <div className={`${divClass} mb-4 xl:w-96`}>
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
            <DatePicker
              withPortal
              id={name}
              {...field}
              {...rest}
              name={name}
              selected={field.value}
              onChange={(val) => form.setFieldValue(name, val)}
              dateFormat={isDateTime ? dateFormat1 : dateFormat2}
              // minDate={minDate}
              // maxDate={maxDate}
              // minTime={minTime}
              // maxTime={maxTime}
              //filterTime={filterTime}
              showTimeSelect={isDateTime && true}
              placeholderText={placeholder}
              //customTimeInput={customTimeInput}
              //excludeTimes={excludeTime}
              //peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              disabledKeyboardNavigation
              className={`
                ${inputClass} 
                ${meta.touched && meta.error && "is-invalid"} 
                form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-secondary focus:outline-none placeholder:text-gray-400 disabled:opacity-60 disabled:pointer-events-none disabled:bg-gray-100
              `}
            />

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
export default CustomDOBPickerForm;
