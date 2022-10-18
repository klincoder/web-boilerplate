// Import resources
import React, { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";

// Import custom files
import tw from "../styles/twStyles";
import TableGlobalFilter from "./TableGlobalFilter";
import CustomButton from "./CustomButton";
import CustomTextInput from "./CustomTextInput";
import CustomAlertMsg from "./CustomAlertMsg";
import TableContainer from "./TableContainer";
import { COLUMNS_ALL_CONTACT } from "../config/columnsAllContact";
import { allContactFormAtom } from "../recoil/atoms";

// Component
const TableAllContact = () => {
  // Define table data
  const tableData = useRecoilValue(allContactFormAtom);
  const tableDataLen = tableData?.length;

  // Debug
  //console.log("Debug tableAllContact: ", tableData);

  // Memorize data and columns to avoid re-render of data
  const columns = useMemo(() => COLUMNS_ALL_CONTACT, []);
  const data = useMemo(() => {
    // Check data
    if (!tableData) {
      return [];
    } else {
      return tableData;
    } // close if
  }, [tableData]);

  // Destructure props from table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    state: { pageIndex, globalFilter },
    setGlobalFilter,
  } = useTable(
    { columns: columns, data: data },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // Return component
  return (
    <TableContainer>
      {/** If tableDataLen < 1 */}
      {tableDataLen < 1 ? (
        <CustomAlertMsg />
      ) : (
        <>
          {/** GLOBAL FILTER */}
          <TableGlobalFilter
            filter={globalFilter}
            setFilter={setGlobalFilter}
            placeholder="Search table"
          />

          {/** TABLE */}
          <table className="min-w-full my-8 border" {...getTableProps}>
            {/** HEADER */}
            <thead className="bg-gray-50 border-b uppercase text-lg text-left">
              {/** Loop headerGroups */}
              {headerGroups.map((headerGroup, index) => (
                <tr key={index + 1} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => (
                    <th
                      key={index + 1}
                      className="text-sm text-gray-800 font-bold px-3 py-4 max-w-lg"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <span className="flex items-center">
                        {column.render("Header")}
                        {/** Sorting icon */}
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <FaArrowDown className="ml-2" />
                          ) : (
                            <FaArrowUp className="ml-2" />
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            {/** BODY */}
            <tbody {...getTableBodyProps}>
              {/** Loop rows - page is used for pagination */}
              {page.map((row, index) => {
                prepareRow(row);
                // Return tr tag
                return (
                  <tr
                    key={index + 1}
                    className="border-b"
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell, index) => {
                      // Return td tag
                      return (
                        <td
                          key={index + 1}
                          className="text-sm text-gray-800 px-3 py-4"
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>

            {/** FOOTER */}
            <tfoot className="bg-gray-50 uppercase text-lg">
              {footerGroups.map((footerGroup, index) => (
                <tr key={index + 1} {...footerGroup.getFooterGroupProps()}>
                  {footerGroup.headers.map((column, index) => (
                    <th
                      key={index + 1}
                      className="text-sm text-left text-gray-800 font-bold px-3 py-4 max-w-lg"
                      {...column.getFooterProps()}
                    >
                      {column.render("Footer")}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          </table>

          {/** PAGINATION */}
          <div className="flex flex-col justify-start gap-3 px-6 md:flex-row md:items-center md:justify-between">
            {/** Current page and total pages */}
            <div className="text-sm font-bold">
              {tableDataLen > 0 &&
                `Showing page ${pageIndex + 1} of ${pageOptions.length}`}
            </div>

            {/** Go to page */}
            <div className="flex flex-row items-center gap-4 font-bold">
              <span className="text-sm">Go to page</span>
              <CustomTextInput
                type="number"
                defaultValue={pageIndex + 1}
                inputClass="w-16"
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
              />
            </div>

            {/** Buttons */}
            <div className="flex flex-row gap-3">
              {/** Previous */}
              <CustomButton
                isNormal
                btnClass={`${tw?.btnText}`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <AiOutlineArrowLeft size={20} />
              </CustomButton>
              {/** Next */}
              <CustomButton
                isNormal
                onClick={() => nextPage()}
                disabled={!canNextPage}
                btnClass={`${tw?.btnText}`}
              >
                <AiOutlineArrowRight size={20} />
              </CustomButton>
            </div>
          </div>
        </>
      )}
    </TableContainer>
  ); // close return
}; // close component

// Export
export default TableAllContact;
