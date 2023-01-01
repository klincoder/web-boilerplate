// Import resources
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Import custom files
import twStyles from "../styles/twStyles";
import useAppSettings from "../hooks/useAppSettings";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import CustomSpinner from "./CustomSpinner";

// Component
const FormLogin = () => {
  // Define app settings
  const { isMounted } = useAppSettings();

  // Define state
  const [showPass, setShowPass] = useState(false);

  // FORM CONFIG
  // Initial values
  const initialValues = {
    emailAddr: "",
    pass: "",
  };

  // Validate
  const validate = Yup.object().shape({
    emailAddr: Yup.string().required("Required").email("Invalid email address"),
    pass: Yup.string().required("Required").min(8, "Too short"),
  });

  // Form state
  const {
    control,
    formState: { isValid, isSubmitting },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    mode: "all",
    defaultValues: initialValues,
    resolver: yupResolver(validate),
  }); // close form state

  // Define variables
  const formVal = watch();

  // Debug
  //console.log("Debug formLogin: ",)

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values) => {
    // Debug
    console.log("Debug submitForm: ", values);
  }; // close fxn

  // Return component
  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      {/** Debug */}
      {/* {console.log("Debug formValues: ",)} */}

      {/** Email address */}
      <CustomInput
        name="emailAddr"
        control={control}
        type="email"
        label="Email Address"
      />

      {/** Pass */}
      <CustomInput
        name="pass"
        control={control}
        type="password"
        label="Password"
        showPass={showPass}
        onShowPass={() => setShowPass(!showPass)}
      />

      {/** Submit */}
      <CustomButton isNormal type="submit" disabled={!isValid || isSubmitting}>
        Submit {isSubmitting && <CustomSpinner />}
      </CustomButton>

      {/** MORE LINKS */}
      <div className="flex flex-col items-center justify-center text-sm mt-4 space-y-2 md:flex-row md:justify-between md:space-y-0">
        {/** Forgot password */}
        <CustomButton isLink href="/password-recovery">
          Forgot password?
        </CustomButton>
        {/** Register */}
        <CustomButton isLink href="/register">
          Register
        </CustomButton>
      </div>
    </form>
  ); // close return
}; // close component

// Export
export default FormLogin;
