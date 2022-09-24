// Import resources
import React from "react";
import { useFormikContext } from "formik";

// Import custom files
import tw from "../styles/twStyles";
import CustomCheckbox from "./CustomCheckbox";

// Component
const CustomCheckboxForm = ({ name, data, ...rest }) => {
  // Define formik context
  const { values, errors, touched, setFieldTouched, handleChange } =
    useFormikContext();

  // Debug
  //console.log("Debug customCheckboxForm: ", name);

  // Return component
  return (
    <CustomCheckbox
      {...rest}
      data={data}
      name={name}
      value={values[name]}
      errName={errors[name]}
      errTouched={touched[name]}
      onBlur={() => setFieldTouched(name)}
      onChange={handleChange(name)}
      inputClass={touched[name] && errors[name] && "border-danger"}
    />
  ); // close return
}; // close component

// Export
export default CustomCheckboxForm;
