// Import resources
import React from "react";

// Import custom files
import tw from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import CustomLoader from "../src/components/CustomLoader";
import { appImages } from "../src/config/data";
import { doc, fireDB, getDoc } from "../src/config/firebase";

// Component
const TestPage = ({ pageDetails }) => {
  // Define pageDetails info
  const pageTitle = "Test Page";

  // Debug
  //console.log("Debug testPage: ",)

  // Return component
  return <CustomLoader />; // close return
}; // close component

// Export
export default TestPage;

// GET SEVER SIDE PROPS
// export const getServerSideProps = async (context) => {
//   // FETCH DATA
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
