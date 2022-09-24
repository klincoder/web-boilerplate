// Import resources
import React from "react";
import { useFormikContext } from "formik";

// Import custom files
import tw from "../styles/twStyles";
import CustomOtpInput from "./CustomOtpInput";
import CustomButton from "./CustomButton";
import CustomSpinner from "./CustomSpinner";

// Component
const CustomOtpInputForm = ({
  name,
  type,
  onSubmitCode,
  isLoading,
  ...rest
}) => {
  // Define formik context
  const {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    setFieldValue,
    setFieldTouched,
  } = useFormikContext();

  // Debug
  //console.log("Debug customOtpInputForm: ", touched);

  // Return component
  return (
    <>
      {/** Verify code input */}
      <CustomOtpInput
        {...rest}
        value={values[name]}
        errName={errors[name]}
        errTouched={touched[name]}
        onBlur={() => setFieldTouched(name)}
        onChange={(e) => setFieldValue(name, e.target.value)}
        inputClass={touched[name] && errors[name] && "border-danger"}
      />

      {/** Button */}
      <CustomButton
        isNormal
        type={type || "button"}
        onClick={onSubmitCode}
        disabled={!isValid || isSubmitting || isLoading}
      >
        Submit
        {(isSubmitting || isLoading) && <CustomSpinner />}
      </CustomButton>
    </>
  ); // close return
}; // close component

// Export
export default CustomOtpInputForm;
