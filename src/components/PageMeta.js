// Import resources
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

// Import custom files
import useAppSettings from "../hooks/useAppSettings";
import { baseUrl } from "../config/data";

// Component
const PageMeta = ({
  isNormal,
  isHomePath,
  title,
  description,
  keywords,
  screenshot,
  ...rest
}) => {
  // Define router
  const router = useRouter();

  // Define app settings
  const { siteInfo } = useAppSettings();

  // Debug
  //console.log("Debug pageMeta: ", siteInfo);

  // Return component
  return (
    <Head>
      {/** Page title */}
      <title>{`${title} ${isHomePath ? "" : ` - ${siteInfo?.name}`}`}</title>

      {/** Favicon */}
      <link rel="icon" href="/favicon.ico" />

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
