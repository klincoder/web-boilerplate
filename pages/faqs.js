// Import resources
import React from "react";
import { useRecoilValue } from "recoil";

// Import custom files
import tw from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import FaqsItem from "../src/components/FaqsItem";
import CustomAlertMsg from "../src/components/CustomAlertMsg";
import CustomButton from "../src/components/CustomButton";
import { activeFaqsAtom } from "../src/recoil/atoms";
import { doc, fireDB, getDoc } from "../src/config/firebase";

// Component
const Faqs = ({ pageDetails }) => {
  // Define pageDetails info
  const introInfo = pageDetails?.sectionIntro;

  // Define atom
  const activeFaqs = useRecoilValue(activeFaqsAtom);
  const generalFaqs = activeFaqs?.filter(
    (item) => item?.category === "general"
  );

  // Debug
  //console.log("Debug faqs: ",)

  // Return component
  return (
    <PageContent pageDetails={pageDetails}>
      {/** SECTION */}
      <section id="faqs" className="pt-14 pb-24 bg-white">
        {/** HEADING */}
        <div className="container mx-auto px-6 mb-4 md:px-24">
          {/* <CustomAlertMsg isNormal type="warning">
            <h6>{introInfo?.heading}</h6>
          </CustomAlertMsg> */}
        </div>

        {/** MAIN CONTAINER */}
        <div className="container mx-auto flex flex-col px-4 md:flex-row md:gap-3">
          {/** COL 1 */}
          <div className="flex flex-col p-6 mb-8 rounded shadow-lg md:w-1/2">
            {/** Heading */}
            <h3 className="mb-6">General</h3>
            {/** Loop generalFaqs */}
            {generalFaqs?.length > 0 &&
              generalFaqs?.map((item) => (
                <FaqsItem key={item?.id} rowData={item} />
              ))}
          </div>

          {/** COL 2 */}
          <div className="flex flex-col p-6 mb-8 rounded shadow-lg md:w-1/2">
            {/** Heading */}
            <h3 className="mb-4">Another Category</h3>
            {/** Loop generalFaqs */}
            {generalFaqs?.length > 0 &&
              generalFaqs?.map((item) => (
                <FaqsItem key={item?.id} rowData={item} />
              ))}
          </div>
        </div>
      </section>
    </PageContent>
  ); // close return
}; // close component

// Export
export default Faqs;

// GET SEVERSIDE PROPS
export async function getServerSideProps(context) {
  // FETCH DATA
  // Get page details
  const pageDetailsRef = doc(fireDB, "appSettings", "pageFaqs");
  const pageDetailsSnap = await getDoc(pageDetailsRef);
  const pageDetailsData = pageDetailsSnap.data();

  // Return props
  return {
    props: {
      pageDetails: pageDetailsData,
    }, // close props
  }; // close return
} // close getServerSide
