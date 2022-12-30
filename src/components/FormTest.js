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
import CustomTextarea from "./CustomTextarea";
import CustomRadio from "./CustomRadio";

// Component
const FormTest = () => {
  // Define app settings
  const { isMounted } = useAppSettings();

  // Define state
  const [showPass, setShowPass] = useState(false);

  // FORM CONFIG
  // Initial values
  const initialValues = {
    fullName: "",
    emailAddr: "",
    pass: "",
    message: "",
    gender1: "",
    gender2: "",
    courses: [],
    allowPush: false,
    dateOfBirth: "",
    timeOfBirth: "",
    paymentMethod: "",
  };

  // Validate
  const validate = Yup.object().shape({
    fullName: Yup.string().required("Required").min(3, "Too short"),
    emailAddr: Yup.string().required("Required").email("Invalid email address"),
    pass: Yup.string().required("Required").min(8, "Too short"),
    message: Yup.string().required("Required").min(5, "Too short"),
    gender1: Yup.string().required("Required"),
    //gender2: Yup.object().required("Required").nullable(),
    // allowPush: Yup.boolean().oneOf([true], "Must be selected"),
    // dateOfBirth: Yup.string().required("Required"),
    // paymentMethod: Yup.object().required("Required").nullable(),
    // courses: Yup.array()
    //   .required("Required")
    //   .min(1, "At least 1")
    //   .max(3, "At most 3"),
  });

  // Form state
  const {
    control,
    formState: { errors, isValid, isSubmitting },
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
  //console.log("Debug formTest: ", formVal?.gender1);

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values) => {
    // Debug
    console.log("Debug submitForm: ", values?.gender1);
  }; // close fxn

  // Return component
  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      {/** Heading */}
      <h3 className="mb-3">Test Form</h3>

      {/** Full name */}
      <CustomInput name="fullName" control={control} label="Full Name" />

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

      {/** Message */}
      <CustomTextarea name="message" control={control} label="Message" />

      {/** Gender 1 */}
      <CustomRadio
        name="gender1"
        control={control}
        label="Gender 1"
        data={["Male", "Female"]}
        value="Female"
        // data={[
        //   {id: "123", title: "Male",},
        // ]}
      />

      {/** Checkbox */}

      {/** Select */}

      {/** File picker */}

      {/** Date picker */}

      {/** Submit */}
      <CustomButton isNormal type="submit" disabled={!isValid || isSubmitting}>
        Submit
      </CustomButton>
    </form>
  ); // close return
}; // close component

// Export
export default FormTest;
