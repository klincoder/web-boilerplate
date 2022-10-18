// Import resources
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";
import CustomSpinner from "./CustomSpinner";
import useAppSettings from "../hooks/useAppSettings";
import CustomTextInputForm from "./CustomTextInputForm";
import FormFeedback from "./FormFeedback";
import CustomTextareaForm from "./CustomTextareaForm";
import CustomDivider from "./CustomDivider";
import LabelCounter from "./LabelCounter";
import LabelBtnModal from "./LabelBtnModal";
import ImageShowcase from "./ImageShowcase";
import { alertMsg, appRegex } from "../config/data";
import { doc, fireDB, setDoc } from "../config/firebase";
import {
  handleIsValidUrl,
  handleTitleCase,
  handleUppercaseFirst,
} from "../config/functions";

// Component
const FormAllHomepage = ({ rowData }) => {
  // Define state
  const [formMsg, setFormMsg] = useState(null);

  // Define app settings
  const { todaysDate, router, alert } = useAppSettings();

  // Define rowData info
  const rowID = "pageHome";
  const rowTitle = rowData?.title; // Page meta
  const rowDesc = rowData?.description;
  const rowHeroHeading = rowData?.sectionHero?.heading; // Hero
  const rowHeroSubHeading = rowData?.sectionHero?.subHeading;
  const rowHeroImage = rowData?.sectionHero?.image;
  const rowHeroBtnText = rowData?.sectionHero?.btnText;
  const rowHeroBtnLink = rowData?.sectionHero?.btnLink;
  const rowServicesHeading = rowData?.sectionServices?.heading; // Services
  const rowServicesSubHeading = rowData?.sectionServices?.subHeading;
  const rowAboutHeading = rowData?.sectionAbout?.heading; // About
  const rowAboutSubHeading = rowData?.sectionAbout?.subHeading;
  const rowAboutImage = rowData?.sectionAbout?.image;
  const rowHiwHeading = rowData?.sectionHowItWorks?.heading; // How it works
  const rowHiwSubHeading = rowData?.sectionHowItWorks?.subHeading;
  const rowBlogHeading = rowData?.sectionRecentBlog?.heading; // Recent blog
  const rowBlogSubHeading = rowData?.sectionRecentBlog?.subHeading;
  const rowCtaHeading = rowData?.sectionCta?.heading; // Cta
  const rowCtaBtnText = rowData?.sectionCta?.btnText;
  const rowCtaBtnLink = rowData?.sectionCta?.btnLink;

  // Debug
  //console.log("Debug formAllHomepage: ", rowData);

  // FORM CONFIG
  // Initial values
  const initialValues = {
    title: rowTitle ? rowTitle : "",
    description: rowDesc ? rowDesc : "",
    heroHeading: rowHeroHeading ? rowHeroHeading : "",
    heroSubHeading: rowHeroSubHeading ? rowHeroSubHeading : "",
    heroImage: rowHeroImage ? rowHeroImage : "",
    heroBtnText: rowHeroBtnText ? rowHeroBtnText : "",
    servicesHeading: rowServicesHeading ? rowServicesHeading : "",
    servicesSubHeading: rowServicesSubHeading ? rowServicesSubHeading : "",
    aboutHeading: rowAboutHeading ? rowAboutHeading : "",
    aboutSubHeading: rowAboutSubHeading ? rowAboutSubHeading : "",
    aboutImage: rowAboutImage ? rowAboutImage : "",
    hiwHeading: rowHiwHeading ? rowHiwHeading : "",
    hiwSubHeading: rowHiwSubHeading ? rowHiwSubHeading : "",
    blogHeading: rowBlogHeading ? rowBlogHeading : "",
    blogSubHeading: rowBlogSubHeading ? rowBlogSubHeading : "",
    ctaHeading: rowCtaHeading ? rowCtaHeading : "",
    ctaBtnText: rowCtaBtnText ? rowCtaBtnText : "",
    ctaBtnLink: rowCtaBtnLink ? rowCtaBtnLink : "",
  };

  // Validate
  const validate = Yup.object({
    title: Yup.string()
      .required("Required")
      .min(30, "Too short")
      .max(62, "Too long"),
    description: Yup.string()
      .required("Required")
      .min(30, "Too short")
      .max(100, "Too long"),
    heroHeading: Yup.string()
      .required("Required")
      .min(30, "Too short")
      .max(50, "Too long"),
    heroSubHeading: Yup.string()
      .required("Required")
      .min(30, "Too short")
      .max(91, "Too long"),
    heroImage: Yup.string()
      .required("Required")
      .matches(appRegex?.url, "Invalid url"),
    heroBtnText: Yup.string()
      .required("Required")
      .min(3, "Too short")
      .max(16, "Too long"),
    servicesHeading: Yup.string()
      .required("Required")
      .min(8, "Too short")
      .max(8, "Too long"),
    servicesSubHeading: Yup.string()
      .required("Required")
      .min(15, "Too short")
      .max(45, "Too long"),
    aboutHeading: Yup.string()
      .required("Required")
      .min(8, "Too short")
      .max(8, "Too long"),
    aboutSubHeading: Yup.string()
      .required("Required")
      .min(100, "Too short")
      .max(200, "Too long"),
    aboutImage: Yup.string()
      .required("Required")
      .matches(appRegex?.url, "Invalid url"),
    hiwHeading: Yup.string()
      .required("Required")
      .min(8, "Too short")
      .max(45, "Too long"),
    hiwSubHeading: Yup.string()
      .required("Required")
      .min(15, "Too short")
      .max(250, "Too long"),
    blogHeading: Yup.string()
      .required("Required")
      .min(8, "Too short")
      .max(11, "Too long"),
    blogSubHeading: Yup.string()
      .required("Required")
      .min(15, "Too short")
      .max(45, "Too long"),
    ctaHeading: Yup.string()
      .required("Required")
      .min(8, "Too short")
      .max(28, "Too long"),
    ctaBtnText: Yup.string()
      .required("Required")
      .min(3, "Too short")
      .max(16, "Too long"),
    ctaBtnLink: Yup.string().required("Required").min(3, "Too short"),
  });

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values, { setSubmitting }) => {
    // Define variables
    const finalTitle = handleTitleCase(values.title);
    const finalDesc = handleUppercaseFirst(values.description);
    const finalHero = {
      heading: handleUppercaseFirst(values.heroHeading),
      subHeading: handleUppercaseFirst(values.heroSubHeading),
      image: values.heroImage?.trim(),
      btnText: handleUppercaseFirst(values.heroBtnText),
      btLink: rowHeroBtnLink,
    };
    const finalServices = {
      heading: handleUppercaseFirst(values.servicesHeading),
      subHeading: handleUppercaseFirst(values.servicesSubHeading),
    };
    const finalAbout = {
      heading: handleUppercaseFirst(values.aboutHeading),
      subHeading: handleUppercaseFirst(values.aboutSubHeading),
      image: values.aboutImage?.trim(),
    };
    const finalHiw = {
      heading: handleUppercaseFirst(values.hiwHeading),
      subHeading: handleUppercaseFirst(values.hiwSubHeading),
    };
    const finalRecentBlog = {
      heading: handleUppercaseFirst(values.blogHeading),
      subHeading: handleUppercaseFirst(values.blogSubHeading),
    };
    const finalCta = {
      heading: handleUppercaseFirst(values.ctaHeading),
      btnText: handleUppercaseFirst(values.ctaBtnText),
      btnLink: values.ctaBtnLink?.trim()?.toLowerCase(),
    };

    // Debug
    //console.log("Debug submitForm: ", values);

    // Try catch
    try {
      // Edit doc
      const editDocRef = doc(fireDB, "appSettings", rowID);
      await setDoc(
        editDocRef,
        {
          title: finalTitle,
          description: finalDesc,
          sectionHero: finalHero,
          sectionServices: finalServices,
          sectionAbout: finalAbout,
          sectionHowItWorks: finalHiw,
          sectionRecentBlog: finalRecentBlog,
          sectionCta: finalCta,
          dateUpdated: todaysDate,
        },
        { merge: true }
      );
      // Alert succ
      alert.success("Changes saved");
      setFormMsg(null);
    } catch (err) {
      alert.error(alertMsg?.general);
      setFormMsg({ type: "err", msg: err.message });
    } // close try catch
    // Set submitting
    setSubmitting(false);
  }; // close fxn

  // Return component
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={handleSubmitForm}
      enableReinitialize
    >
      {({ values, errors, isValid, isSubmitting }) => {
        // Define variables
        const isHeroUrl = handleIsValidUrl(values.heroImage);
        const isAboutUrl = handleIsValidUrl(values.aboutImage);

        // Return form
        return (
          <Form autoComplete="">
            {/** Debug */}
            {/* {console.log("Debug formValues:", errors)} */}

            {/** Form feedback */}
            <FormFeedback data={formMsg} />

            {/** PAGE META */}
            <div className="px-6 py-4 mb-8 rounded-xl shadow-lg bg-white">
              <h5>Page Meta (For SEO)</h5>
              <CustomDivider dividerClass="my-4" />
              {/** Title */}
              <CustomTextInputForm isRequired name="title" label="Title" />
              {/** Desc */}
              <CustomTextareaForm
                isRequired
                name="description"
                label="Description"
                labelRight={
                  <LabelCounter val={values.description} maxCount={100} />
                }
              />
            </div>

            {/** HERO SECTION */}
            <div className="px-6 py-4 mb-8 rounded-xl shadow-lg bg-white">
              <h5>Hero Section</h5>
              <CustomDivider dividerClass="my-4" />
              {/** Row */}
              <div className="flex flex-col-reverse md:flex-row md:gap-3">
                {/** Col 1 */}
                <div className="flex flex-col md:w-3/4 mb-8">
                  {/** Heading */}
                  <CustomTextInputForm
                    isRequired
                    name="heroHeading"
                    label="Heading"
                  />
                  {/** Sub heading */}
                  <CustomTextareaForm
                    isRequired
                    name="heroSubHeading"
                    label="Sub Heading"
                    labelRight={
                      <LabelCounter val={values.heroSubHeading} maxCount={91} />
                    }
                  />
                  {/** Image */}
                  <CustomTextInputForm
                    isRequired
                    name="heroImage"
                    label="Image Link"
                    helperText="Recommened size 580px x 525px"
                    labelRight={
                      <LabelBtnModal
                        name="libraryShowcaseBtn"
                        modalID="libraryShowcaseModal"
                        icon="upload"
                      />
                    }
                  />
                  {/** Btn text */}
                  <CustomTextInputForm
                    isRequired
                    name="heroBtnText"
                    label="Button Text"
                    labelRight={
                      <LabelCounter val={values.heroBtnText} maxCount={16} />
                    }
                  />
                </div>
                {/** Col 2 - Image showcase */}
                <ImageShowcase
                  newImage={isHeroUrl && values.heroImage}
                  oldImage={rowHeroImage}
                />
              </div>
            </div>

            {/** SERVICES SECTION */}
            <div className="px-6 py-4 mb-8 rounded-xl shadow-lg bg-white">
              <h5>Services Section</h5>
              <CustomDivider dividerClass="my-4" />
              {/** Heading */}
              <CustomTextInputForm
                isRequired
                name="servicesHeading"
                label="Heading"
              />
              {/** Sub heading */}
              <CustomTextInputForm
                isRequired
                name="servicesSubHeading"
                label="Sub Heading"
              />
            </div>

            {/** ABOUT SECTION */}
            <div className="px-6 py-4 mb-8 rounded-xl shadow-lg bg-white">
              <h5>About Section</h5>
              <CustomDivider dividerClass="my-4" />
              {/** Row */}
              <div className="flex flex-col-reverse md:flex-row md:gap-3">
                {/** Col 1 */}
                <div className="flex flex-col md:w-3/4 mb-8">
                  {/** Heading */}
                  <CustomTextInputForm
                    isRequired
                    name="aboutHeading"
                    label="Heading"
                  />
                  {/** Sub heading */}
                  <CustomTextareaForm
                    isRequired
                    rows={5}
                    name="aboutSubHeading"
                    label="Sub Heading"
                    labelRight={
                      <LabelCounter
                        val={values.aboutSubHeading}
                        maxCount={200}
                      />
                    }
                  />
                  {/** Image */}
                  <CustomTextInputForm
                    isRequired
                    name="aboutImage"
                    label="Image Link"
                    helperText="Recommened size 580px x 525px"
                    labelRight={
                      <LabelBtnModal
                        name="libraryShowcaseBtn"
                        modalID="libraryShowcaseModal"
                        icon="upload"
                      />
                    }
                  />
                </div>
                {/** Col 2 - Image showcase */}
                <ImageShowcase
                  newImage={isAboutUrl && values.aboutImage}
                  oldImage={rowAboutImage}
                />
              </div>
            </div>

            {/** HOW IT WORKS SECTION */}
            <div className="px-6 py-4 mb-8 rounded-xl shadow-lg bg-white">
              <h5>How It Works Section</h5>
              <CustomDivider dividerClass="my-4" />
              {/** Heading */}
              <CustomTextInputForm
                isRequired
                name="hiwHeading"
                label="Heading"
              />
              {/** Sub heading */}
              <CustomTextareaForm
                isRequired
                rows={5}
                name="hiwSubHeading"
                label="Sub Heading"
                labelRight={
                  <LabelCounter val={values.hiwSubHeading} maxCount={250} />
                }
              />
            </div>

            {/** RECENT BLOG SECTION */}
            <div className="px-6 py-4 mb-8 rounded-xl shadow-lg bg-white">
              <h5>Recent Blog Section</h5>
              <CustomDivider dividerClass="my-4" />
              {/** Heading */}
              <CustomTextInputForm
                isRequired
                name="blogHeading"
                label="Heading"
              />
              {/** Sub heading */}
              <CustomTextInputForm
                isRequired
                name="blogSubHeading"
                label="Sub Heading"
              />
            </div>

            {/** CTA SECTION */}
            <div className="px-6 py-4 mb-8 rounded-xl shadow-lg bg-white">
              <h5>Cta Section</h5>
              <CustomDivider dividerClass="my-4" />
              {/** Heading */}
              <CustomTextInputForm
                isRequired
                name="ctaHeading"
                label="Heading"
              />
              {/** Btn text */}
              <CustomTextInputForm
                isRequired
                name="ctaBtnText"
                label="Button Text"
              />
              {/** Btn link */}
              <CustomTextInputForm
                isRequired
                name="ctaBtnLink"
                label="Button Link"
              />
            </div>

            {/** Button */}
            <div className="text-center">
              <CustomButton
                isNormal
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                Save Changes
                {isSubmitting && <CustomSpinner />}
              </CustomButton>
            </div>
          </Form>
        ); // cloe return
      }}
    </Formik>
  ); // close return
}; // close component

// Export
export default FormAllHomepage;
