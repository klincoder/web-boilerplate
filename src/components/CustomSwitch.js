// Import resources
import React from "react";
import { Controller } from "react-hook-form";

// Import custom files
import twStyles from "../styles/twStyles";
import CustomChip from "./CustomChip";
import CustomHelperText from "./CustomHelperText";
import { handleItemIsInArr, handleItemIsInObjArr } from "../config/functions";

// Component
const CustomSwitch = ({
  name,
  control,
  label,
  value,
  data,
  helperText,
  styleContainer,
  styleInput,
  ...rest
}) => {
  // Debug
  //console.log("Debug customSwitch: ",)

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
            {/** Loop data */}
            {data?.map((item, index) => (
              <div
                key={item + index}
                className="form-check form-check-inline form-switch"
              >
                <input
                  {...rest}
                  ref={ref}
                  id={name + index}
                  name={name}
                  type="checkbox"
                  role="switch"
                  value={item}
                  onChange={onChange}
                  onBlur={onBlur}
                  className={`
                  ${styleInput} ${error ? "is-invalid" : ""} 
                  form-check-input appearance-none w-9 -ml-10 mr-2 rounded-full float-left h-5 align-top bg-no-repeat bg-contain bg-gray-300 checked:bg-primary checked:border-primary checked:disabled:bg-lightPrimary focus:outline-none shadow-sm cursor-pointer
                `}
                />
                {/** Checkbox label */}
                <label
                  htmlFor={name + index}
                  className="form-check-label inline-block text-gray-800 cursor-pointer text-sm"
                >
                  {item}
                </label>
              </div>
            ))}

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
export default CustomSwitch;
