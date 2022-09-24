// Import resources
import React, { useMemo } from "react";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";
import CustomImage from "./CustomImage";
import { appImages } from "../config/data";
import { handleFormatDate, handleSliceString } from "../config/functions";

// Component
const BlogItem = ({ rowData, index }) => {
  // Define rowData info
  const rowID = rowData?.id;
  const rowUserID = rowData?.userID;
  const rowTitle = rowData?.title;
  const rowSlug = rowData?.slug;
  const rowImage = rowData?.titleImage;
  const rowExcerpt = rowData?.excerpt;
  const rowAuthor = handleSliceString(rowData?.username, 0, 9);
  const rowDatePublished = handleFormatDate(rowData?.datePublished, 1);

  // Debug
  //console.log("Debug blogItem: ", rowContent);

  // Return component
  return (
    <div className="mb-6 lg:mb-0">
      <div className="relative h-full block bg-white rounded-lg shadow-lg">
        {/** Header */}
        <div className="flex">
          {/** Image */}
          <div className="relative overflow-hidden bg-no-repeat bg-cover shadow-lg rounded-lg mx-4 -mt-4">
            <CustomImage
              image={rowImage || appImages?.general}
              imgClass="w-full"
              width={800}
              height={600}
            />
          </div>
        </div>

        {/** Content */}
        <div className="p-6">
          {/** Title */}
          <h5 className="font-bold text-lg mb-3 text-gray-800">{rowTitle}</h5>

          {/** Meta */}
          <p className="text-gray-500 mb-4">
            <small>
              By{" "}
              <CustomButton isLink href={`/`}>
                <a className="text-gray-800">{rowAuthor}</a>
              </CustomButton>{" "}
              on <span>{rowDatePublished}</span>
            </small>
          </p>

          {/** Excerpt */}
          <div className="mb-4 pb-2 text-gray-500">{rowExcerpt}</div>

          {/** Button - read more */}
          <CustomButton isLink href={`/blog/${rowSlug}`}>
            <a
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className={tw?.btnPrimary}
            >
              Read more
            </a>
          </CustomButton>
        </div>
      </div>
    </div>
  ); // close return
}; // close component

// Export
export default BlogItem;
