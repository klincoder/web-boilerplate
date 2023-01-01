// Import resources
import React from "react";
import { Controller } from "react-hook-form";

// Import custom files
import twStyles from "../styles/twStyles";
import CustomChip from "./CustomChip";
import CustomHelperText from "./CustomHelperText";
import { handleItemIsInArr, handleItemIsInObjArr } from "../config/functions";

// Component
const CustomCheckbox = ({
  isNormal,
  isObjArr,
  name,
  control,
  label,
  value,
  data,
  title,
  onClick,
  helperText,
  errMsg,
  styleContainer,
  styleInput,
  ...rest
}) => {
  // Debug
  //console.log("Debug customCheckbox: ",)

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

      {/** IF IS NORMAL */}
      {isNormal ? (
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
                  className="form-check form-check-inline"
                >
                  <input
                    {...rest}
                    ref={ref}
                    id={name + index}
                    name={name}
                    type="checkbox"
                    value={item}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`
                      ${styleInput} ${error ? "is-invalid" : ""} 
                      form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-primary checked:border-primary checked:disabled:bg-lightPrimary disabled:bg-gray-300 disabled:pointer-events-none disabled:opacity-60 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer
                    `}
                  />
                  {/** Checkbox label */}
                  <label
                    htmlFor={name + index}
                    className="form-check-label inline-block text-gray-800 cursor-pointer text-sm"
                  >
                    {title}
                  </label>
                </div>
              ))}

              {/** Helper msg */}
              <CustomHelperText visible={helperText} title={helperText} />

              {/** Error msg */}
              <CustomHelperText
                isError
                visible={error}
                title={error?.message}
              />
            </>
          )}
        />
      ) : (
        <>
          {/** Input */}
          <div className="flex flex-row flex-wrap">
            {isObjArr
              ? data?.map((item, index) => (
                  <CustomChip
                    key={`${label}${index + 1}`}
                    title={item?.title}
                    isSolid={handleItemIsInObjArr(value, item?.id)}
                    onClick={() => onClick(item)}
                    styleChip="mx-1"
                  />
                ))
              : data?.map((item, index) => (
                  <CustomChip
                    key={`${label}${index + 1}`}
                    title={item}
                    isSolid={handleItemIsInArr(value, item)}
                    onClick={() => onClick(item)}
                    styleChip="mx-1"
                  />
                ))}
          </div>

          {/** Helper text */}
          <CustomHelperText visible={helperText} title={helperText} />

          {/** Error msg */}
          <CustomHelperText isError visible={errMsg} title={errMsg} />
        </>
      )}
    </div>
  ); // close return
}; // close component

// Export
export default CustomCheckbox;
