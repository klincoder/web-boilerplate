// Import resources
import React from "react";

// Import custom files
import tw from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import CustomCard from "../src/components/CustomCard";
import FormPasswordRecovery from "../src/components/FormPasswordRecovery";
import { appImages } from "../src/config/data";

// Component
const PasswordRecovery = () => {
  // Define page details
  const pageTitle = "Password Recovery";

  // Debug
  //console.log("Debug passwordRecovery: ",)

  // Return component
  return (
    <PageContent title={pageTitle}>
      {/** SECTION - PAGE DETAILS */}
      <section className="bg-white">
        {/** MAIN CONTAINER */}
        <div className="container mx-auto flex flex-col items-center justify-center px-4 pt-14 pb-24 w-full">
          {/** COL 1 - CARD */}
          <CustomCard isNormal title={pageTitle}>
            {/** Form */}
            <FormPasswordRecovery />
          </CustomCard>
        </div>
      </section>
    </PageContent>
  ); // close return
}; // close component

// Export
export default PasswordRecovery;
