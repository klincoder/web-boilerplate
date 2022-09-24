// Import resources
import React, { useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useRouter } from "next/router";

// Import custom files
import tw from "../styles/twStyles";
import { prevRouteAtom } from "../recoil/atoms";

// Component
const PrevRouteTracker = () => {
  // Define ref
  const refPrevRoute = useRef(null);

  // Define state
  // const setPrevRouteAtom = useSetRecoilState(prevRouteAtom);
  const [prevRoute, setPrevRouteAtom] = useRecoilState(prevRouteAtom);

  // Define router
  const router = useRouter();
  const routerAsPath = router?.asPath;

  // Debug
  console.log("Debug prevRouteTracker: ", prevRoute);

  // SIDE EFFECTS
  // TRACK PREVIOUS ROUTE
  useEffect(() => {
    // Define previous route
    refPrevRoute.current = routerAsPath;
    // Set atom
    setPrevRouteAtom(refPrevRoute.current);
  }, [routerAsPath]);

  // Return component
  return null;
}; // close component

// Export
export default PrevRouteTracker;
