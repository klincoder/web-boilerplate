// Import resources
import React from "react";
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

// Import custom files
import tw from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import SectionWrapper from "../src/components/SectionWrapper";
import SectionFeatures from "../src/components/SectionFeatures";
import CtaDownloadApp from "../src/components/CtaDownloadApp";
import CtaHomepage from "../src/components/CtaHomepage";
import useAppSettings from "../src/hooks/useAppSettings";
import CustomButton from "../src/components/CustomButton";
import { handleSendEmail } from "../src/config/functions";
import { apiRoutes, appFeaturesList, appImages } from "../src/config/data";
import {
  collection,
  doc,
  fireDB,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "../src/config/firebase";

// Component
const Home = ({ pageDetails }) => {
  // Define app settings
  const { todaysDate1 } = useAppSettings();

  const [userInfo] = useLocalStorage("userStorage");

  // Define pageDetails info
  const heroInfo = {
    //pageDetails?.sectionHero;
    heading: "A simple & catchy headline here.",
    subHeading:
      "Give a brief explanation of the main benefits of using your app. Lore ipsum lorep ipsum lorep ipsum.",
    image: appImages?.hero,
  };
  const featuresInfo = {
    //pageDetails?.sectionFeatures
    heading: "Features",
    subHeading: "Designed to provide solutions.",
    features: appFeaturesList,
  };
  const aboutInfo = {
    //pageDetails?.sectionAbout
    heading: "About Us",
    subHeading:
      "Lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum.",
    image: appImages?.mockup2,
  };
  const benefitsInfo1 = {
    //pageDetails?.sectionBenefits1
    heading: "Benefit 1",
    subHeading:
      "Lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum.",
    image: appImages?.mockup1,
  };
  const benefitsInfo2 = {
    //pageDetails?.sectionBenefits2
    heading: "Benefit 2",
    subHeading:
      "Lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum.",
    image: appImages?.mockup2,
  };
  const ctaInfo = {
    //pageDetails?.sectionCta;
    heading: "Download Now",
    subHeading: "Do more with the mobile app",
  };

  // Debug
  //console.log("Debug home: ", userInfo?.email);

  // Return component
  return (
    <PageContent pageDetails={pageDetails}>
      {/** SECTION - HERO */}
      <SectionWrapper
        showBtn
        id="homeHero"
        rowData={heroInfo}
        btnContent={<CtaDownloadApp />}
      />

      {/** TEST BUTTON */}
      {/* <div className="px-6 py-3">
        <CustomButton
          isNormal
          onClick={async () => {
            // writeStorage("userStorage", {
            //   email: "chinaemeremtech@gmail.com",
            //   username: "chinaemeremtech",
            // });

            // Define doc ref
            // const docRef = doc(fireDB, "appSettings", "pageFaqs");
            // await setDoc(
            //   docRef,
            //   {
            //     date1: serverTime,
            //     date2: todaysDate,
            //   },
            //   { merge: true }
            // );

            // Send pass change alert
            await handleSendEmail(
              "user",
              userInfo?.username,
              userInfo?.email,
              todaysDate1,
              apiRoutes?.passChange
            );
          }}
        >
          TEST BUTTON
        </CustomButton>
      </div> */}

      {/** SECTION - FEATURES */}
      <SectionFeatures id="homeFeatures" rowData={featuresInfo} />

      {/** SECTION - ABOUT US */}
      <SectionWrapper
        isReverse
        id="homeAbout"
        rowData={aboutInfo}
        bannerClass="!bg-secondary"
        headingClass="!text-white"
        subHeadingClass="!text-gray-50"
      />

      {/** SECTION - BENEFITS 1 */}
      <SectionWrapper id="homeBenefits1" rowData={benefitsInfo1} />

      {/** SECTION - BENEFITS 2 */}
      <SectionWrapper isReverse id="homeBenefits2" rowData={benefitsInfo2} />

      {/** SECTION - CTA */}
      <CtaHomepage id="homeCta" rowData={ctaInfo} />
    </PageContent>
  ); // close return
}; // close component

// Export
export default Home;

// GET SEVER SIDE PROPS
export const getServerSideProps = async (context) => {
  // Get page details
  const pageDetailsRef = doc(fireDB, "appSettings", "pageHome");
  const pageDetailsSnap = await getDoc(pageDetailsRef);
  const pageDetailsData = pageDetailsSnap.data();

  // Return props
  return {
    props: {
      pageDetails: pageDetailsData,
    }, // close props
  }; // close return
}; // close getServerSide
