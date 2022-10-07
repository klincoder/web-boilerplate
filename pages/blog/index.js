// Import resources
import React, { useEffect, useState } from "react";

// Import custom files
import tw from "../../src/styles/twStyles";
import PageContent from "../../src/components/PageContent";
import BlogItem from "../../src/components/BlogItem";
import CustomPagination from "../../src/components/CustomPagination";
import CustomAlertMsg from "../../src/components/CustomAlertMsg";
import CustomDivider from "../../src/components/CustomDivider";
import { handlePaginateArr } from "../../src/config/functions";
import {
  fireDB,
  query,
  getDocs,
  doc,
  where,
  collection,
  orderBy,
  collectionGroup,
  getDoc,
} from "../../src/config/firebase";

// Component
const Blog = ({ pageDetails, activePosts }) => {
  // Define state
  const [paginatedPosts, setPaginatedPosts] = useState([]);
  const paginatedData = paginatedPosts?.data;
  const paginatedDataLen = paginatedData?.length;

  // Debug
  //console.log("Debug blog: ", paginatedPosts);

  // SIDE EFFECTS
  // HANDLE INITIAL PAGINATION
  useEffect(() => {
    // If empty args, return
    if (activePosts?.length < 1) return;
    // Define get pagination
    const getPagination = handlePaginateArr(activePosts);
    // Set state
    setPaginatedPosts(getPagination);
  }, [activePosts, setPaginatedPosts]);

  // Return component
  return (
    <PageContent pageDetails={pageDetails}>
      {/** SECTION - PAGE DETAILS */}
      <section className="bg-white px-6 pt-14 pn-24">
        {/** HEADING */}
        <div className="container mx-auto py-4 mb-4 text-center">
          <h3 className="mb-8">{pageDetails?.title}</h3>
          <CustomDivider />
        </div>

        {/** MAIN CONTAINER */}
        <div className="container mx-auto flex flex-col pb-24">
          {/** COL 1 - POSTS */}
          <div className="flex flex-col mb-6">
            {/** If paginatedDataLen > 0 */}
            {paginatedDataLen > 0 ? (
              <>
                {/** Loop paginatedData */}
                <div className="grid gap-6 mb-6 lg:grid-cols-3 xl:gap-x-12">
                  {paginatedData?.map((item, index) => (
                    <BlogItem key={item?.id} rowData={item} index={index} />
                  ))}
                </div>

                {/** Pagination */}
                <CustomPagination
                  divClass="mt-4"
                  data={paginatedPosts}
                  onPrevPage={() => {
                    // Get pagination
                    const getPagination = handlePaginateArr(
                      activePosts,
                      paginatedPosts?.prevPage
                    );
                    // Set state
                    setPaginatedPosts(getPagination);
                  }}
                  onNextPage={() => {
                    // Get pagination
                    const getPagination = handlePaginateArr(
                      activePosts,
                      paginatedPosts?.nextPage
                    );
                    // Set state
                    setPaginatedPosts(getPagination);
                  }}
                />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <CustomAlertMsg title="No post found" />
              </div>
            )}
          </div>

          {/** COL 2 */}
          {/* <div className="flex flex-col mb-32 space-y-8 md:w-1/2">
            <p>Col 2</p>
          </div> */}

          {/** Close container */}
        </div>
      </section>
    </PageContent>
  ); // close return
}; // close component

// Export
export default Blog;

// GET SERVER SIDE PROPS
// PRE-FETCH DYNAMIC CONTENT
export const getServerSideProps = async (context) => {
  // Get page details
  const pageDetailsRef = doc(fireDB, "appSettings", "pageBlog");
  const pageDetailsSnap = await getDoc(pageDetailsRef);
  const pageDetailsData = pageDetailsSnap.data();

  // Get active blog posts
  const activePostsRef = query(
    collectionGroup(fireDB, "blogPosts"),
    where("status", "==", "active"),
    orderBy("datePublished", "desc")
  );
  const activePostsSnap = await getDocs(activePostsRef);
  const activePostsData =
    activePostsSnap.size > 0 &&
    activePostsSnap.docs.map((doc) => {
      return doc.data();
    });

  // Return props
  return {
    props: {
      pageDetails: pageDetailsData,
      activePosts: activePostsData,
    }, // close props
  }; // close return
}; // close getServerSide
