// Import resources
import { useRef } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

// Import custom files
import { handleDayJsFormat } from "../config/functions";
import { generalSettingsAtom } from "../recoil/atoms";

// Component
const useAppSettings = () => {
  // Define state
  const generalSettings = useRecoilValue(generalSettingsAtom);

  // Define isMounted
  const isMounted = useRef(false);

  // Define router
  const router = useRouter();

  // Define variables
  const todaysDate = handleDayJsFormat();
  const todaysDate1 = handleDayJsFormat(todaysDate, 1);
  const todaysDate2 = handleDayJsFormat(todaysDate, 2);
  const currPath = router?.pathname;
  const routeQuery = router?.query;
  const isHomePath = currPath === "/";
  const isBlogSlug = currPath === "/blog/[slug]";
  const isRouteQuery = Object?.keys(routeQuery)?.length > 0;
  const siteInfo = {
    logo: generalSettings?.app_logo,
    name: generalSettings?.app_name,
    email: generalSettings?.support_email,
    phone: generalSettings?.support_phone,
    noReply: generalSettings?.support_email_reply,
    copyrightName: generalSettings?.copyright_name,
    adminName: generalSettings?.admin_name,
    adminEmail: generalSettings?.admin_email,
    bank: generalSettings?.bank_info,
    workingHours: generalSettings?.working_hours,
    location: generalSettings?.location,
  };

  // FUNCTIONS
  // HANDLE

  // Return component
  return {
    isMounted,
    router,
    todaysDate,
    todaysDate1,
    todaysDate2,
    currPath,
    routeQuery,
    isHomePath,
    isBlogSlug,
    isRouteQuery,
    siteInfo,
  }; // close return
}; // close component

// Export
export default useAppSettings;
