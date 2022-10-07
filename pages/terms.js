// Import resources
import React from "react";

// Import custom files
import tw from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import CustomDivider from "../src/components/CustomDivider";
import { doc, fireDB, getDoc } from "../src/config/firebase";
import { handleHtmlParser } from "../src/config/functions";

// Component
const Terms = ({ pageDetails }) => {
  // Define pageDetails info
  const pageTitle = pageDetails?.title;
  const pageContent = handleHtmlParser(pageDetails?.content);

  // Debug
  //console.log("Debug terms: ",)

  // Return component
  return (
    <PageContent pageDetails={pageDetails}>
      {/** SECTION - PAGE DETAILS */}
      <section className="bg-white pt-14 pb-24">
        {/** HEADER */}
        <div className="container mx-auto mb-12">
          <h3 className="text-center mb-8">{pageTitle}</h3>
          <CustomDivider />
        </div>

        {/** MAIN CONTAINER */}
        <div className="container mx-auto flex flex-col">
          {/** COL 1 - CONTENT */}
          <div className="flex flex-col p-6 mb-8 w-full">{pageContent}</div>
        </div>
      </section>
    </PageContent>
  ); // close return
}; // close component

// Export
export default Terms;

// GET SEVER SIDE PROPS
export const getServerSideProps = async (context) => {
  // FETCH DATA
  // Get page details
  const pageDetailsRef = doc(fireDB, "appSettings", "pageTerms");
  const pageDetailsSnap = await getDoc(pageDetailsRef);
  const pageDetailsData = pageDetailsSnap.data();

  // Return props
  return {
    props: {
      pageDetails: pageDetailsData,
    }, // close props
  }; // close return
}; // close getServerSide
