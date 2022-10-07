// Import resources
import React from "react";

// Import custom files
import tw from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import FormLogin from "../src/components/FormLogin";
import CustomCard from "../src/components/CustomCard";

// Component
const Login = () => {
  // Define page details
  const pageTitle = "Login";

  // Debug
  //console.log("Debug login: ", routerHistory);

  // Return component
  return (
    <PageContent title={pageTitle}>
      {/** SECTION - PAGE DETAILS */}
      <section className="bg-white">
        {/** CONTAINER */}
        <div className="container mx-auto flex flex-row items-center justify-center px-4 pt-14 pb-24 w-full md:space-y-0">
          {/** COL 1 - CARD */}
          <CustomCard isNormal title="Login">
            {/** Form */}
            <FormLogin />
          </CustomCard>
        </div>
      </section>
    </PageContent>
  ); // close return
}; // close component

// Export
export default Login;
