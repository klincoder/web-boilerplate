// Import resources
import { useRef } from "react";
import { useRouter } from "next/router";

// Import custom files
import { handleDayJsFormat } from "../config/functions";

// Component
const useAppSettings = () => {
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
  }; // close return
}; // close component

// Export
export default useAppSettings;
