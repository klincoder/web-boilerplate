// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";
import CustomHelperText from "./CustomHelperText";

// Component
const CustomSelect = ({
  label,
  name,
  data,
  isKeyValue,
  divClass,
  inputClass,
  helperMsg,
  errName,
  errTouched,
  optionLabel,
  ...rest
}) => {
  // Debug
  //console.log("Debug customSelect: ",)

  // Return component
  return (
    <div className={`xl:w-96 ${divClass}`}>
      {/** Label */}
      {label && (
        <label
          htmlFor={name}
          className="form-label inline-block text-sm font-semibold mb-1"
        >
          {label}
        </label>
      )}

      {/** Input */}
      <select
        {...rest}
        id={name}
        name={name}
        className={`${inputClass} form-select form-select-lg appearance-none block w-full pl-4 pr-10 py-2 m-0 text-sm font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-secondary focus:outline-none disabled:opacity-60 disabled:pointer-events-none disabled:bg-gray-100`}
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
                <option key={item} value={item}>
                  {item}
                </option>
              ); // close return
            } // close if
          })}
      </select>

      {/** Helper msg */}
      {helperMsg && <CustomHelperText visible={helperMsg} title={helperMsg} />}

      {/** Error msg */}
      <CustomHelperText isError title={errName} visible={errTouched} />
    </div>
  ); // close return
}; // close component

// Export
export default CustomSelect;
