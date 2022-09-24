// Import resources
import React from "react";

// Import custom files
import tw from "../src/styles/twStyles";
import PageContent from "../src/components/PageContent";
import FormContactUs from "../src/components/FormContactUs";
import CustomListItem from "../src/components/CustomListItem";
import useAppSettings from "../src/hooks/useAppSettings";
import CustomButton from "../src/components/CustomButton";
import CustomDivider from "../src/components/CustomDivider";
import { appImages } from "../src/config/data";
import { doc, fireDB, getDoc } from "../src/config/firebase";

// Component
const Contact = ({ pageDetails }) => {
  // Define app settings
  const { siteInfo } = useAppSettings();

  // Define contactArr
  const contactArr = [
    {
      id: "123",
      title: "Call Us",
      image: appImages?.call,
      desc: siteInfo?.phone,
      link: `tel:${siteInfo?.phone}`,
    },
    {
      id: "456",
      title: "Email Us",
      image: appImages?.email,
      desc: siteInfo?.email,
      link: `mailto:${siteInfo?.email}`,
    },
    {
      id: "789",
      title: "Location",
      image: appImages?.location,
      desc: siteInfo?.location,
      link: `#`,
    },
  ];

  // Debug
  //console.log("Debug contact: ", pageDetails);

  // Return component
  return (
    <PageContent pageDetails={pageDetails}>
      {/** SECTION - PAGE DETAILS */}
      <section className="bg-white px-4 pt-14 pb-24">
        {/** HEADING */}
        <div className="container mx-auto mb-12">
          <h3 className="text-center mb-8">{pageDetails?.title}</h3>
          <CustomDivider />
        </div>

        {/** MAIN CONTAINER */}
        <div className="container mx-auto flex flex-col gap-4 md:flex-row">
          {/** COL 1 - CALL / EMAIL */}
          <div className="flex flex-col p-6 mb-8 rounded shadow-lg md:w-1/2">
            {/** Loop contactArr */}
            {contactArr?.map((item) => (
              <CustomButton isLink key={item?.id} href={item?.link}>
                <a className="no-underline">
                  <CustomListItem
                    title={item?.title}
                    description={item?.desc}
                    image={item?.image}
                    divClass="mb-12"
                    titleClass="text-primary"
                  />
                </a>
              </CustomButton>
            ))}
          </div>

          {/** COL 2 - FORM */}
          <div className="flex flex-col p-6 mb-8 rounded shadow-lg md:w-1/2">
            {/** Form */}
            <FormContactUs />
          </div>
        </div>
      </section>
    </PageContent>
  ); // close return
}; // close component

// Export
export default Contact;

// GET SEVER SIDE PROPS
export const getServerSideProps = async (context) => {
  // FETCH DATA
  // Get page details
  const pageDetailsRef = doc(fireDB, "appSettings", "pageContact");
  const pageDetailsSnap = await getDoc(pageDetailsRef);
  const pageDetailsData = pageDetailsSnap.data();

  // Return props
  return {
    props: {
      pageDetails: pageDetailsData,
    }, // close props
  }; // close return
}; // close getServerSide
