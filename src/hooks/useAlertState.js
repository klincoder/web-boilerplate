// Import resources
import { useState } from "react";
import { toast } from "react-toastify";

// Import custom files

// Component
const useAlertState = () => {
  // Define state
  const [loading, setLoading] = useState(false);

  // Define variables
  let testFxn;

  // FUNCTIONS
  // HANDLE SHOW LOADING
  const showLoading = () => {
    setLoading(true);
  }; // close fxn

  // HANDLE HIDE LOADING
  const hideLoading = () => {
    setLoading(false);
  }; // close fxn

  // HANDLE SUCCESS
  const success = (msg) => {
    toast.success(msg, {
      // theme: "light",
      // position: "top-right",
      // autoClose: 5000,
      // hideProgressBar: false,
      // closeOnClick: true,
      // pauseOnHover: true,
      // draggable: true,
      // progress: undefined,
    });
  }; // close fxn

  // HANDLE ERROR
  const error = (msg) => {
    toast.error(msg, {
      // theme: "light",
      // position: "top-right",
      // autoClose: 5000,
      // hideProgressBar: false,
      // closeOnClick: true,
      // pauseOnHover: true,
      // draggable: true,
      // progress: undefined,
    });
  }; // close fxn

  // HANDLE INFO
  const info = (msg) => {
    toast.info(msg, {
      // theme: "light",
      // position: "top-right",
      // autoClose: 5000,
      // hideProgressBar: false,
      // closeOnClick: true,
      // pauseOnHover: true,
      // draggable: true,
      // progress: undefined,
    });
  }; // close fxn

  // Return component
  return { loading, success, error, info, showLoading, hideLoading }; // close return
}; // close component

// Export
export default useAlertState;
