// Import resources
import React, { useEffect } from "react";
import NextNProgress from "nextjs-progressbar";
import Script from "next/script";
import { useRouter } from "next/router";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

// Import custom files
import "../src/styles/globals.css";
import "react-toastify/dist/ReactToastify.min.css";
import twStyles from "../src/styles/twStyles";
import * as gtag from "../src/config/gtag";
import GetDatabaseContent from "../src/components/GetDatabaseContent";
import ScrollUpBtn from "../src/components/ScrollUpBtn";
import { isProdEnv } from "../src/config/data";

// Component
const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  // Define router
  const router = useRouter();

  // Debug
  //console.log("Debug app: ",)

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

      {/** TOAST CONTAINER */}
      <ToastContainer
        theme="light"
        position="top-right"
        rtl={false}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
      />

      {/** APP BODY */}
      <RecoilRoot>
        <SessionProvider session={session}>
          {/** Get database content */}
          <GetDatabaseContent />

          {/** Main component */}
          <Component {...pageProps} />

          {/** Scroll up button */}
          <ScrollUpBtn />
        </SessionProvider>
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
