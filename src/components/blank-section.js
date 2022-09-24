// Import resources
import React from "react";

// Import custom files
import tw from "../styles/twStyles";

// Component
const BlankSection = () => {
  // Debug
  //console.log("Debug blankSection: ",)

  // Return component
  return (
    <section className="bg-white">
      {/** MAIN CONTAINER */}
      <div className="container mx-auto flex flex-col px-6 py-24 md:flex-row">
        {/** COL 1 */}
        <div className="flex flex-col p-6 mb-8 rounded shadow-lg md:w-1/2">
          <p>Content 1</p>
        </div>

        {/** COL 2 */}
        {/* <div className="flex flex-col p-6 mb-8 rounded shadow-lg md:w-1/2">
        <p>Col 2</p>
      </div> */}
      </div>
    </section>
  ); // close return
}; // close component

// Export
export default BlankSection;
