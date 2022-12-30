// Import resources
import React from "react";
import { Controller } from "react-hook-form";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

// Import custom files
import twStyles from "../styles/twStyles";
import CustomHelperText from "./CustomHelperText";

// Component
const CustomRadio = ({
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
  //console.log("Debug customRadio: ",)

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
        defaultValue={value}
        render={({
          field: { value, ref, onChange, onBlur },
          fieldState: { error },
          formState: {},
        }) => (
          <>
            {/** Loop data */}
            {data?.length > 0 &&
              data?.map((item, index) => (
                <div
                  key={item + index}
                  className="form-check form-check-inline"
                >
                  {/** Radio input */}
                  <input
                    {...rest}
                    ref={ref}
                    id={name + index}
                    name={name}
                    value={value}
                    onChange={onChange}
                    //onChange={(e) => onChange(e.target.checked)}
                    // onChange={(val) => {
                    //   console.log("Debug: ", val);
                    // }}
                    // onClick={(val) => {
                    //   console.log("Debug: ", { item, value });
                    // }}
                    onBlur={onBlur}
                    type="radio"
                    className={`
                      ${styleInput} ${error ? "is-invalid" : ""} 
                      form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary checked:border-primary checked:disabled:bg-lightPrimary disabled:bg-gray-400 disabled:pointer-events-none disabled:opacity-60 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer
                    `}
                  />
                  {/** Radio label */}
                  <label
                    htmlFor={name + index}
                    className="form-check-label inline-block text-gray-800 cursor-pointer text-sm"
                  >
                    {item}
                  </label>
                </div>
              ))}

            {/** TEST */}
            {/* <div class="form-check form-check-inline mt-3">
              <input
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio10"
                value="option1"
              />
              <label
                class="form-check-label inline-block text-gray-800"
                htmlFor="inlineRadio10"
              >
                Test Radio
              </label>
            </div> */}

            {/** Helper msg */}
            {helperText && (
              <CustomHelperText visible={helperText} title={helperText} />
            )}

            {/** Error msg */}
            <CustomHelperText isError visible={error} title={error?.message} />
          </>
        )}
      />
    </div>
  ); // close return
}; // close component

// Export
export default CustomRadio;
