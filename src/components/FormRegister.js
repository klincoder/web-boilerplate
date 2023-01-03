// Import resources
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { writeStorage } from "@rehooks/local-storage";

// Import custom files
import twStyles from "../styles/twStyles";
import useAppSettings from "../hooks/useAppSettings";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import CustomSpinner from "./CustomSpinner";
import useAuthState from "../hooks/useAuthState";
import useAlertState from "../hooks/useAlertState";
import { alertMsg, apiRoutes, appRegex, otpDefaultTimer } from "../config/data";
import { doc, fireAuth, fireDB, setDoc } from "../config/firebase";
import {
  handleCompareHashVal,
  handleGenOtpCode,
  handleGenUsername,
  handleHashVal,
  handleSendEmail,
  handleTitleCase,
} from "../config/functions";
import CustomOtpInput from "./CustomOtpInput";

// Component
const FormRegister = () => {
  // Define app settings
  const { todaysDate, todaysDate1, router, siteInfo } = useAppSettings();

  // Define state
  const { handleUserExist, handleRegister } = useAuthState();
  const [showPass, setShowPass] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpCode, setOtpCode] = useState(null);
  const [currTimer, setCurrTimer] = useState(otpDefaultTimer);

  // Define alert
  const alert = useAlertState();

  // FORM CONFIG
  // Initial values
  const initialValues = {
    username: "",
    emailAddr: "",
    pass: "",
    otpInput: "",
    isOtpInput: showOtpInput,
  };

  // Validate
  const validate = Yup.object().shape({
    isOtpInput: Yup.boolean(),
    username: Yup.string().required("Required").min(2, "Too short"),
    emailAddr: Yup.string().required("Required").email("Invalid email address"),
    pass: Yup.string().required("Required").min(8, "Too short"),
    //otpInput: Yup.string().required("Required").max(7, "Too long"),
    // otpInput: Yup.string().when("isOtpInput", {
    //   is: true,
    //   then: Yup.string().required("Required").max(7, "Too long"),
    // }),
  });

  // Form state
  const {
    control,
    formState: { isValid, isSubmitting },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    mode: "all",
    defaultValues: initialValues,
    resolver: yupResolver(validate),
  }); // close form state

  // Define variables
  const formVal = watch();
  const genOtpCode = handleGenOtpCode();
  const finalUsername = formVal?.username?.trim()?.toLowerCase();
  const finalEmail = formVal.emailAddr?.trim()?.toLowerCase();
  const finalPass = formVal.pass?.trim();
  const finalOtpInput = formVal.otpInput?.trim();
  const passHash = handleHashVal(finalPass);

  // Debug
  //console.log("Debug formRegister: ", formVal?.otpInput);

  // FUNCTIONS
  // HANDLE OTP EMAIL
  const handleOtpEmail = async (otp) => {
    // If empty args, return
    if (!otp) return null;
    // Check if user exist
    const userExist = handleUserExist(finalEmail);
    // If userExist
    if (userExist?.valid) {
      alert.error(alertMsg?.userExistSucc);
      return;
    } // close if
    // Try catch
    try {
      // Send email
      alert.showLoading();
      const otpHash = handleHashVal(otp);
      const otpMsg = { toName: finalUsername, toEmail: finalEmail, otp };
      await handleSendEmail(otpMsg, apiRoutes?.otp);
      // Set state
      setOtpCode({ raw: otp, hash: otpHash });
      setShowOtpInput(true);
      alert.info(alertMsg?.otpSendSucc);
      alert.hideLoading();
      //console.log("Debug shwoOtpInput: ", { otpHash, otpMsg });
    } catch (err) {
      alert.error(alertMsg?.generalErr);
      alert.hideLoading();
      //console.log("Debug shwoOtpInput: ", err.message);
    } // close try catch
  }; // close fxn

  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values) => {
    // Verify otp
    const verifyOtp = handleCompareHashVal(finalOtpInput, otpCode?.hash);
    // If verify otp
    if (verifyOtp) {
      // Try catch
      try {
        // Register user
        await handleRegister(finalUsername, finalEmail, finalPass);

        // Define variables
        const currUser = fireAuth.currentUser;
        const currUserID = currUser?.uid;
        const userMsg = {
          role: "user",
          toName: finalUsername,
          toEmail: finalEmail,
          date: todaysDate1,
        };
        const adminMsg = {
          role: "admin",
          toName: siteInfo?.adminName,
          toEmail: siteInfo?.adminEmail,
          date: todaysDate1,
        };

        // Add user to db
        const newUserRef = doc(fireDB, "users", currUserID);
        await setDoc(newUserRef, {
          reg_method: "website",
          avatar: "",
          role: "user",
          full_name: "",
          email_address: finalEmail,
          password: passHash,
          push_status: { app: true, email: true, sms: true },
          userID: currUserID,
          username: finalUsername,
          dateCreated: todaysDate,
          dateUpdated: todaysDate,
        });

        // Send email
        // await handleSendEmail(userMsg, apiRoutes?.welcome);
        // await handleSendEmail(adminMsg, apiRoutes?.newUser);

        // Alert succ
        alert.success(alertMsg?.registerSucc);
        alert.hideLoading();
        reset();
        setOtpCode(null);
        router.push("/login");
        //console.log("Debug submitForm: ", emailMsg);
      } catch (err) {
        alert.error(alertMsg?.generalErr);
        alert.hideLoading();
        //console.log("Debug submitForm: ", err.message);
      } // close try catch
    } else {
      alert.error(alertMsg?.otpVerifyErr);
    } // close if
  }; // close fxn

  // Return component
  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      {/** Debug */}
      {/* {console.log("Debug formValues: ",)} */}

      {/** IF SHOW OTP INPUT */}
      {showOtpInput ? (
        <CustomOtpInput
          control={control}
          currTimer={currTimer}
          showSpinner={isSubmitting || alert.loading}
          disabled={!isValid || isSubmitting || !formVal?.otpInput}
          setCurrTimer={(val) => setCurrTimer(val)}
          onClickCancel={() => setShowOtpInput(false)}
          onClickResend={async () => {
            alert.showLoading(); // Show loading
            await handleOtpEmail(genOtpCode); // Send new otp email
            setCurrTimer(otpDefaultTimer); // Reset curr timer
            alert.hideLoading(); // Hide loading
          }}
        />
      ) : (
        <>
          {/** Username */}
          <CustomInput name="username" control={control} label="Username" />

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

          {/** Button - show otp input */}
          <CustomButton
            isNormal
            onClick={() => handleOtpEmail(genOtpCode)}
            disabled={!isValid || alert.loading}
          >
            Register {alert.loading && <CustomSpinner />}
          </CustomButton>

          {/** Accept terms */}
          <div className="text-sm text-center text-gray-500 mt-2">
            By creating an account, you accept our{" "}
            <CustomButton isLink href="/terms" target="_blank" rel="noreferrer">
              terms
            </CustomButton>
          </div>

          {/** MORE LINKS */}
          {/** Login */}
          <div className="text-center text-sm mt-4">
            <CustomButton isLink href="/login">
              Have an account? Login
            </CustomButton>
          </div>
        </>
      )}
    </form>
  ); // close return
}; // close component

// Export
export default FormRegister;
