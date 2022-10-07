// Import resources
import React from "react";

// Import custom files
import tw from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import { appImages } from "../src/config/data";
import { doc, fireDB, getDoc } from "../src/config/firebase";

// Component
const BlankPage = ({ pageDetails }) => {
  // Define pageDetails info
  const pageTitle = "BlankPage";

  // Debug
  //console.log("Debug blankPage: ",)

  // Return component
  return (
    <PageContent pageDetails={pageDetails}>
      {/** SECTION */}
      <section className="bg-white">
        {/** MAIN CONTAINER */}
        <div className="container mx-auto flex flex-col px-6 pt-14 pb-24">
          {/** COL 1 */}
          <div className="flex flex-col p-6 mb-8 rounded shadow-lg">
            <p>Content 1</p>
          </div>

          {/** COL 2 */}
          {/* <div className="flex flex-col p-6 mb-8 rounded shadow-lg">
            <p>Col 2</p>
          </div> */}
        </div>
      </section>
    </PageContent>
  ); // close return
}; // close component

// Export
export default BlankPage;

// GET SEVER SIDE PROPS
// export const getServerSideProps = async (context) => {
//   // Get page details
//   // const pageDetailsRef = doc(fireDB, "appSettings", "pagePrivacy");
//   // const pageDetailsSnap = await getDoc(pageDetailsRef);
//   // const pageDetailsData = pageDetailsSnap.data();

//   // Return props
//   return {
//     props: {
//       //pageDetails:  pageDetailsData,
//     }, // close props
//   }; // close return
// }; // close getServerSide
