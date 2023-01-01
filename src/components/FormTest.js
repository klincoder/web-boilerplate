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
import CustomCheckbox from "./CustomCheckbox";
import CustomSwitch from "./CustomSwitch";
import CustomSelect from "./CustomSelect";
import CustomSpinner from "./CustomSpinner";
import { handleAddItemToArr, handleAddItemToObjArr } from "../config/functions";

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
    gender: "",
    courses: [],
    allowPush: false,
    location: [],
    images: [],
    dateOfBirth: "",
  };

  // Validate
  const validate = Yup.object().shape({
    fullName: Yup.string().required("Required").min(3, "Too short"),
    emailAddr: Yup.string().required("Required").email("Invalid email address"),
    pass: Yup.string().required("Required").min(8, "Too short"),
    message: Yup.string().required("Required").min(5, "Too short"),
    gender: Yup.string().required("Required"),
    courses: Yup.array()
      .required("Required")
      .min(1, "At least 1")
      .max(3, "At most 3"),
    allowPush: Yup.boolean().oneOf([true], "Required"),
    location: Yup.object().required("Required").nullable(),
    // dateOfBirth: Yup.string().required("Required"),
    // paymentMethod: Yup.object().required("Required").nullable(),
  });

  // Form state
  const {
    control,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
  } = useForm({
    mode: "all",
    defaultValues: initialValues,
    resolver: yupResolver(validate),
  }); // close form state

  // Define variables
  const formVal = watch();

  // Debug
  //console.log("Debug formTest: ", formVal);

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

      {/** Gender */}
      <CustomRadio
        name="gender"
        label="Gender"
        data={["Male", "Female"]}
        value={formVal?.gender}
        errMsg={errors?.gender?.message}
        onClick={(val) => {
          setValue("gender", val);
          trigger("gender");
        }}
      />

      {/** Courses */}
      <CustomCheckbox
        name="courses"
        label="Courses"
        data={["React", "React Native"]}
        value={formVal?.courses}
        errMsg={errors?.courses?.message}
        onClick={(val) => {
          //const newObjArr = handleAddItemToObjArr(formVal?.courses, val?.id, val);
          const newArr = handleAddItemToArr(formVal?.courses, val);
          setValue("courses", newArr);
          trigger("courses");
        }}
      />

      {/** Allow push */}
      <CustomSwitch
        name="allowPush"
        control={control}
        label="Notification Settings"
        data={["SMS"]}
      />

      {/** Select */}
      <CustomSelect
        name="location"
        control={control}
        label="Location"
        data={[
          { label: "Chocolate", value: "chocolate" },
          { label: "Strawberry", value: "strawberry" },
          { label: "Vanilla", value: "vanilla" },
        ]}
      />

      {/** Date picker */}

      {/** File picker */}

      {/** Submit */}
      <CustomButton isNormal type="submit" disabled={!isValid || isSubmitting}>
        Submit {isSubmitting && <CustomSpinner />}
      </CustomButton>
    </form>
  ); // close return
}; // close component

// Export
export default FormTest;
