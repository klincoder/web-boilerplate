// Import resources
import React from "react";
import { useFormikContext } from "formik";

// Import custom files
import tw from "../styles/twStyles";
import CustomHelperMsg from "./CustomHelperMsg";
import CustomSwitch from "./CustomSwitch";

// Component
const CustomSwitchForm = ({ name, data, ...rest }) => {
  // Define formik context
  const { values, errors, touched, setFieldTouched, handleChange } =
    useFormikContext();

  // Debug
  //console.log("Debug customSwitchForm: ",)

  // Return component
  return (
    <CustomSwitch
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
export default CustomSwitchForm;
