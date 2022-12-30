// Import resources
import React, { useEffect } from "react";
import nookies from "nookies";
import AlertTemplate from "react-alert-template-basic";
import NextNProgress from "nextjs-progressbar";
import Script from "next/script";
import { RecoilRoot } from "recoil";
import { useRouter } from "next/router";
import { transitions, positions, Provider as AlertProvider } from "react-alert";

// Import custom files
import "../src/styles/globals.css";
import twStyles from "../src/styles/twStyles";
import GetDatabaseContent from "../src/components/GetDatabaseContent";
import ScrollUpBtn from "../src/components/ScrollUpBtn";
import * as gtag from "../src/config/gtag";
import { isProdEnv } from "../src/config/data";
import { fireAuth, onIdTokenChanged } from "../src/config/firebase";

// Alert provider options
const alertProviderOpt = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: "40px",
  transition: transitions.SCALE,
};

// Component
const App = ({ Component, pageProps }) => {
  // Define router
  const router = useRouter();

  // Debug
  //console.log("Debug app: ",)

  // SIDE EFFECTS
  // LISTEN TO AUTH STATE
  useEffect(() => {
    // On mount
    const unsubscribe = onIdTokenChanged(fireAuth, async (currUser) => {
      // Get token
      const token = await currUser?.getIdToken(true);
      // If token
      if (token) {
        nookies.set(undefined, "ftoken", token, { path: "/" });
      } else {
        nookies.set(undefined, "ftoken", "", { path: "/" });
        //console.log("Debug app: ", currUser);
      } // close if
    }); // close unsubscribe
    // Clean up
    return () => {
      unsubscribe();
    };
  }, []);

  // SIDE EFFECTS
  // GA TRACKING
  useEffect(() => {
    // If !isProdEnv return
    if (!isProdEnv) return;
    // Handle route change
    const handleRouteChange = (url) => {
      gtag.pageView(url);
    };
    // Define onChangeComplete
    router.events.on("routeChangeComplete", handleRouteChange);
    // Clean up
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    }; // close return
  }, [router.events]);

  // Return component
  return (
    <>
      {/** NPROGRESS LOADER */}
      <NextNProgress
        color="#E03427"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
        options={{ showSpinner: false }}
      />

      {/** APP BODY */}
      <RecoilRoot>
        <AlertProvider template={AlertTemplate} {...alertProviderOpt}>
          {/** Get database content */}
          <GetDatabaseContent />

          {/** Main component */}
          <Component {...pageProps} />

          {/** Scroll up button */}
          <ScrollUpBtn />
        </AlertProvider>
      </RecoilRoot>

      {/** CUSTOM JS SCRIPTS */}
      {/** TW ELEMENTS */}
      <Script
        async
        strategy="afterInteractive"
        src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js"
      />

      {/** GTAG */}
      <Script
        async
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag?.GA_TRACKING_ID}`}
      />

      {/** GOOGLE ANALYTICS */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag?.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  ); // close return
}; // close component

// Export
export default App;
