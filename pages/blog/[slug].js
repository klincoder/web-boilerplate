// Import resources
import React from "react";

// Import custom files
import tw from "../../src/styles/twStyles";
import PageContent from "../../src/components/PageContent";
import CustomImage from "../../src/components/CustomImage";
import CustomDivider from "../../src/components/CustomDivider";
import { handleHtmlParser } from "../../src/config/functions";
import { appImages } from "../../src/config/data";
import {
  fireDB,
  query,
  getDocs,
  doc,
  where,
  collection,
  collectionGroup,
  orderBy,
} from "../../src/config/firebase";

// Component
const BlogDetails = ({ rowData }) => {
  // Define row data info
  const rowTitle = rowData?.title;
  const rowImage = rowData?.titleImage;
  const rowExcerpt = rowData?.excerpt;
  const rowSlug = rowData?.slug;
  const rowContent = handleHtmlParser(rowData?.content);

  // Define page details
  const pageDetails = {
    title: rowTitle,
    description: rowExcerpt,
  };

  // Debug
  //console.log("Debug blogDetails: ", Image.length);

  // Return component
  return (
    <PageContent pageDetails={pageDetails}>
      {/** SECTION */}
      <section className="bg-white pt-14 pb-24">
        {/** HEADING */}
        <div className="container mx-auto py-4 mb-4 text-center">
          <h3 className="mb-8">{rowTitle}</h3>
          <CustomDivider />
        </div>

        {/** MAIN CONTAINER */}
        <div className="container mx-auto px-4">
          {/** COL 1 */}
          <div className="flex flex-col mb-6">
            {/** Image */}
            <div className="relative flex justify-center mb-12 overflow-hidden bg-no-repeat bg-cover">
              <CustomImage
                image={rowImage}
                alt={rowSlug}
                imgClass="w-full shadow-lg rounded-lg"
                width={800}
                height={400}
              />
            </div>
            {/** Content */}
            <div>{rowContent}</div>
          </div>
        </div>
      </section>
    </PageContent>
  ); // close return
}; // close component

// Export
export default BlogDetails;

// GET STATIC PATHS
// INFORM NEXTJS OF POSSIBLE DYNAMIC ROUTES
export const getStaticPaths = async () => {
  // Get all blog posts slug
  const allPostsRef = collectionGroup(fireDB, "blogPosts");
  const allPostsSnap = await getDocs(allPostsRef);
  const allPostsData =
    allPostsSnap.size > 0 &&
    allPostsSnap.docs.map((doc) => {
      return {
        params: { slug: doc.data().slug },
      };
    });

  // Return paths
  return {
    paths: allPostsData,
    fallback: false,
  }; // close return
}; // close getStaticPaths

// GET STATIC PROPS
// PRE-FETCH DYNAMIC CONTENT
export const getStaticProps = async ({ params }) => {
  // Get post details
  const postRef = query(
    collectionGroup(fireDB, "blogPosts"),
    where("slug", "==", `${params.slug}`),
    orderBy("dateCreated", "desc")
  );
  const postSnap = await getDocs(postRef);
  const postData =
    postSnap.size > 0 &&
    postSnap.docs.map((doc) => {
      return doc.data();
    });

  // Return props
  return {
    props: {
      rowData: postData?.[0],
    }, // close props
  }; // close return
}; // close getServerSide
