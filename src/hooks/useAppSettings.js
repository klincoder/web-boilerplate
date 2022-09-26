// Import resources
import moment from "moment";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import { useRecoilValue } from "recoil";

// Import custom files
import { handleFormatDate } from "../config/functions";
import { appSettingsAtom } from "../recoil/atoms";

// Compnent
const useAppSettings = () => {
  // Define atom
  const allSettings = useRecoilValue(appSettingsAtom);

  // Define router
  const router = useRouter();

  // Define alert
  const alert = useAlert();

  // Define general settings
  const generalSettings = allSettings?.find(
    ({ id }) => id === "generalSettings"
  )?.data;

  // Define todays date
  const todaysDate = moment.utc().format();
  const todaysDate1 = handleFormatDate(todaysDate, 1);
  const todaysDate2 = handleFormatDate(todaysDate, 2);

  // Define site info
  const siteInfo = {
    logo: generalSettings?.appLogo,
    name: generalSettings?.appName,
    email: generalSettings?.supportEmail,
    phone: generalSettings?.supportPhone,
    noReply: generalSettings?.supportEmailNoReply,
    copyrightName: generalSettings?.copyrightName,
    adminName: generalSettings?.adminName,
    adminEmail: generalSettings?.adminEmail,
    bank: generalSettings?.bankInfo,
    workingHours: generalSettings?.workingHours,
    location: generalSettings?.location,
  };

  // Debug
  //console.log("Debug useApp Settings: ", user);

  // FUNCTIONS
  // HANDLE

  // Return data
  return {
    siteInfo,
    todaysDate,
    todaysDate1,
    todaysDate2,
    router,
    alert,
  }; // close return
}; // close component

// Export
export default useAppSettings;
