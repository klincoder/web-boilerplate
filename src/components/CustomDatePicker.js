import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Import custom files
import "react-datepicker/dist/react-datepicker.css";
import CustomButton from "./CustomButton";
import CustomHelperText from "./CustomHelperText";

// Component
const CustomDatePicker = ({
  label,
  name,
  value,
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
  // Define date options
  const today = new Date();

  // Defien state
  // const [startDate, setStartDate] = useState(new Date());
  const [yearState, setYearState] = useState(today);
  const [monthState, setMonthState] = useState(today.getMonth());

  // Defien date info
  const dateFormat1 = "MMMM d, yyyy h:mm aa";
  const dateFormat2 = "MMMM d, yyyy";
  const now = today.getUTCFullYear();
  const years = Array(now - (now - 100))
    .fill("")
    .map((v, idx) => now - idx);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Debug
  //console.log("Debug customDatePicker: ", months);

  // Return component
  return (
    <div className={`${divClass} xl:w-96`}>
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
        {...rest}
        id={name}
        name={name}
        selected={value}
        className={`${inputClass} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-secondary focus:outline-none placeholder:text-gray-400 disabled:opacity-60 disabled:pointer-events-none disabled:bg-gray-100`}
        dateFormat={isDateTime ? dateFormat1 : dateFormat2}
        minDate={minDate}
        maxDate={maxDate}
        minTime={minTime}
        maxTime={maxTime}
        filterTime={filterTime}
        showTimeSelect={isDateTime && true}
        placeholderText={placeholder}
        customTimeInput={customTimeInput}
        excludeTimes={excludeTime}
        withPortal
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        disabledKeyboardNavigation
      />

      {/** Helper msg */}
      {helperText && (
        <CustomHelperText visible={helperText} title={helperText} />
      )}

      {/** Error msg */}
      <CustomHelperText isError title={errName} visible={errTouched} />
    </div>
  ); // close return
}; // close component

// Export
export default CustomDatePicker;
