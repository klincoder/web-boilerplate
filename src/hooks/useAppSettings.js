// Import resources
import { useRef } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

// Import custom files
import { handleDayJsFormat, handleGetInfoById } from "../config/functions";
import { appSettingsAtom } from "../recoil/atoms";

// Component
const useAppSettings = () => {
  // Define state
  const appSettings = useRecoilValue(appSettingsAtom);

  // Define ref
  const isMounted = useRef(false);

  // Define router
  const router = useRouter();

  // Define settings
  const general = handleGetInfoById(appSettings, "general")?.data;
  const links = handleGetInfoById(appSettings, "links")?.data;
  const bank = handleGetInfoById(appSettings, "bank")?.data;
  const slides = handleGetInfoById(appSettings, "slides")?.data;

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
    logo: general?.app_logo, // General
    name: general?.app_name,
    email: general?.support_email,
    phone: general?.support_phone,
    noReply: general?.noreply_email,
    copyrightName: general?.copyright_name,
    adminName: general?.admin_name,
    adminEmail: general?.admin_email,
    location: general?.location,
    android: links?.android, // Links
    ios: links?.ios,
    github: links?.github,
    instagram: links?.instagram,
    tiktok: links?.tiktok,
  };

  // FUNCTIONS
  // HANDLE

  // Return component
  return {
    appSettings,
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
