// Import resources
import React from "react";
import { Controller } from "react-hook-form";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import ReactSelect, { StylesConfig } from "react-select";

// Import custom files
import twStyles from "../styles/twStyles";
import CustomHelperText from "./CustomHelperText";

// Component
const CustomSelect = ({
  name,
  control,
  label,
  type,
  data,
  placeholder,
  helperText,
  styleContainer,
  styleInput,
  ...rest
}) => {
  // Debug
  //console.log("Debug customSelect: ",)

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
            {/** Input */}
            <ReactSelect
              {...rest}
              ref={ref}
              id={name}
              name={name}
              options={data}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder || `Enter ${label?.toLowerCase()}`}
              isClearable
              theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                colors: {
                  ...theme.colors,
                  primary: "#313bac",
                  primary25: "#ebecf9",
                },
              })}
              // className={`
              //   ${styleInput} ${error ? "is-invalid" : ""}
              //   text-sm font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-secondary focus:outline-none disabled:opacity-60 disabled:pointer-events-none disabled:bg-gray-100
              // `}
            />

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
export default CustomSelect;
