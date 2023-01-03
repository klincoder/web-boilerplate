// Import resources
import React, { useEffect, useState } from "react";

// Import custom files
import twStyles from "../styles/twStyles";
import useAppSettings from "../hooks/useAppSettings";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import CustomSpinner from "./CustomSpinner";
import CustomChip from "./CustomChip";

// Component
const CustomOtpInput = ({
  control,
  timerVal,
  currTimer,
  setCurrTimer,
  showSpinner,
  onClickCancel,
  onClickResend,
  ...rest
}) => {
  // Define app settings
  const { isMounted } = useAppSettings();

  // Define state
  //const [currTimer, setCurrTimer] = useState(timerVal || 59);

  // Define variables
  const isActive = currTimer > 0;

  // Debug
  //console.log("Debug customOtpInput: ",)

  // FUNCTIONS
  // HANDLE CURRENT TIMER
  const handleCurrTimer = () => {
    const result = Number(currTimer - 1);
    setCurrTimer(result);
  }; // close fxn

  // SIDE EFFECTS
  // SET INTERVAL FOR TIMER
  useEffect(() => {
    if (currTimer === 0) return;
    const interval = setInterval(() => handleCurrTimer(), 1000);
    return () => clearInterval(interval);
  }, [handleCurrTimer]);

  // Return component
  return (
    <div className="w-50">
      {/** Otp input */}
      <CustomInput name="otpInput" control={control} label="Enter your OTP" />

      {/** Submit */}
      <CustomButton isNormal type="Submit" {...rest}>
        Submit {showSpinner && <CustomSpinner />}
      </CustomButton>

      {/** Timer */}
      <div className="mt-6 text-sm">
        {/** Show timer */}
        {isActive && (
          <span className="text-center">Resend in {currTimer}...</span>
        )}
      </div>

      {/** Action buttons */}
      <div className="flex flex-col items-center justify-center space-y-2 md:flex-row md:justify-between md:space-y-0">
        {!isActive && (
          <>
            {/** Cancel */}
            <CustomChip
              title="Cancel"
              onClick={onClickCancel}
              styleChip="border-0 text-gray-500"
            />

            {/** Resend */}
            <CustomChip
              title="Resend OTP"
              onClick={onClickResend}
              //styleChip="border-primary text-primary"
            />
          </>
        )}
      </div>
    </div>
  ); // close return
}; // close component

// Export
export default CustomOtpInput;
