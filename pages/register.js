// Import resources
import React from "react";

// Import custom files
import tw from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import CustomCard from "../src/components/CustomCard";
import FormRegister from "../src/components/FormRegister";
import { appImages } from "../src/config/data";

// Component
const Register = () => {
  // Define page details
  const pageTitle = "Register";

  // Debug
  //console.log("Debug register: ",)

  // Return component
  return (
    <PageContent title={pageTitle}>
      {/** SECTION - PAGE DETAILS */}
      <section id="registerPage" className="bg-white">
        {/** MAIN CONTAINER */}
        <div className="container mx-auto w-full flex items-center justify-center px-4 pt-14 pb-24">
          {/** COL 1 - REGISTER */}
          <CustomCard isNormal title="Register">
            {/** Form */}
            <FormRegister />
          </CustomCard>
        </div>
      </section>
    </PageContent>
  ); // close return
}; // close component

// Export
export default Register;
