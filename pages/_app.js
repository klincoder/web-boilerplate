// Import resources
import React, { useEffect, useRef } from "react";
import AlertTemplate from "react-alert-template-basic";
import NextNProgress from "nextjs-progressbar";
import Script from "next/script";
import { RecoilRoot } from "recoil";
import { transitions, positions, Provider as AlertProvider } from "react-alert";

// Import custom files
import "../src/styles/globals.css";
import useAppSettings from "../src/hooks/useAppSettings";
import GetDatabaseContent from "../src/components/GetDatabaseContent";
import PrivateRoute from "../src/components/PrivateRoute";
import ProtectedRoute from "../src/components/ProtectedRoute";
import ScrollUpButton from "../src/components/ScrollUpButton";
import * as gtag from "../src/config/gtag";
import { isProdEnv, noAuthRoute } from "../src/config/data";
import { AuthContextProvider } from "../src/context/AuthContext";
import { useRouter } from "next/router";

// Component
const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  // Define router
  const router = useRouter();
  const currPath = router.pathname;
  const isNoAuthRoute = noAuthRoute?.includes(currPath);

  // Define alert provider config
  const alertProviderConfig = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: "40px",
    transition: transitions.SCALE,
  };

  // Debug
  //console.log("Debug appjs: ", fireAuth);

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
        <AlertProvider template={AlertTemplate} {...alertProviderConfig}>
          <AuthContextProvider>
            {/** Get database content */}
            <GetDatabaseContent />

            {/** If isNoAuthRequired */}
            {isNoAuthRoute ? (
              <PrivateRoute>
                <Component {...pageProps} />
              </PrivateRoute>
            ) : (
              <ProtectedRoute>
                <Component {...pageProps} />
              </ProtectedRoute>
            )}

            {/** Scroll up button */}
            <ScrollUpButton />
          </AuthContextProvider>
        </AlertProvider>
      </RecoilRoot>

      {/** CUSTOM JS SCRIPTS */}
      {/** TW ELEMENTS */}
      <Script
        async
        strategy="afterInteractive"
        src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js"
      />

      {/** Gtag */}
      <Script
        async
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />

      {/** Google analytics */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  ); // close return
}; // close component

// Export
export default MyApp;
