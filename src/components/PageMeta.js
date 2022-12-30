// Import resources
import React from "react";
import Head from "next/head";

// Import custom files
import twStyles from "../styles/twStyles";
import { baseUrl } from "../config/data";

// Component
const PageMeta = ({
  isNormal,
  title,
  description,
  siteInfo,
  keywords,
  screenshot,
  ...rest
}) => {
  // Debug
  //console.log("Debug pageMeta: ",)

  // Return component
  return (
    <Head>
      {/** Page title */}
      <title>{`${title} - ${siteInfo?.name}`}</title>

      {/** Favicon */}
      <link rel="icon" href="/favicon.ico" />

      {/** Fonts */}
      {/* <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap"
      /> */}

      {/** If isNormal, show seo meta */}
      {isNormal && (
        <>
          {/** Meta title */}
          <meta name="title" content={title} />

          {/** Page description */}
          <meta name="description" content={description} />

          {/** Page keywords */}
          <meta name="keywords" content={keywords} />

          {/** Other page meta */}
          <meta name="robots" content="index, nofollow" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="language" content="English" />
          <meta name="revisit-after" content="3 days" />
          <meta name="author" content={siteInfo?.siteName} />

          {/** OPEN GRAPH FOR SOCIAL MEDIA */}
          {/** Og title */}
          <meta property="og:title" content={title} />

          {/** Og site name */}
          <meta property="og:site_name" content="Fit to fly UK" />

          {/** Og url */}
          <meta property="og:url" content={baseUrl} />

          {/** Og description */}
          <meta property="og:description" content={description} />

          {/** Og type */}
          <meta property="og:type" content="website" />

          {/** Og image */}
          <meta property="og:image" content={screenshot} />
        </>
      )}
    </Head>
  ); // close return
}; // close component

// Export
export default PageMeta;
