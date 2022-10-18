// Import resources
import React, { useRef } from "react";
import moment from "moment";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";

// Import custom files
import { handleFormatDate } from "../config/functions";
import { appSettingsAtom } from "../recoil/atoms";

// Compnent
const useAppSettings = () => {
  // Define atom
  const allSettings = useRecoilValue(appSettingsAtom);

  // Define todays date
  const todaysDate = moment.utc().format();
  const todaysDate1 = handleFormatDate(todaysDate, 1);
  const todaysDate2 = handleFormatDate(todaysDate, 2);

  // Define isMounted
  const isMounted = useRef(false);

  // Define router
  const router = useRouter();

  // Define alert
  const alert = useAlert();

  // Define general settings
  const generalSettings = allSettings?.find(
    ({ id }) => id === "generalSettings"
  )?.data;

  // Define pages
  const pageHome = allSettings?.find(({ id }) => id === "pageHome")?.data;
  const pageFaqs = allSettings?.find(({ id }) => id === "pageFaqs")?.data;
  const pageContact = allSettings?.find(({ id }) => id === "pageContact")?.data;
  const pagePrivacy = allSettings?.find(({ id }) => id === "pagePrivacy")?.data;
  const pageTerms = allSettings?.find(({ id }) => id === "pageTerms")?.data;
  const pageBlog = allSettings?.find(({ id }) => id === "pageBlog")?.data;

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

  // Define current path
  const currPath = router.pathname;
  const routerQuery = router.query;
  const isHomePath = currPath === "/";
  const isBlogSlug = currPath === "/blog/[slug]";
  const routeHasQuery = Object.keys(router.query)?.length > 0;

  // Debug
  //console.log("Debug useAppSettings: ", user);

  // Return component
  return {
    siteInfo,
    todaysDate,
    todaysDate1,
    todaysDate2,
    router,
    alert,
    currPath,
    routerQuery,
    isHomePath,
    isBlogSlug,
    isMounted,
    routeHasQuery,
    pageHome,
    pageFaqs,
    pageContact,
    pagePrivacy,
    pageTerms,
    pageBlog,
  }; // close return
}; // close component

// Export
export default useAppSettings;
