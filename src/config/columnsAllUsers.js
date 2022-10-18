// Import resources
import moment from "moment";

// Import custom files
import tw from "../styles/twStyles";
import TableActionsBtn from "../components/TableActionsBtn";
import { handleFormatDate, handleStatusColor } from "./functions";

// Export
export const COLUMNS_ALL_USERS = [
  {
    id: "row",
    Header: "S/NO",
    Footer: "S/NO",
    maxWidth: 50,
    filterable: false,
    Cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    Header: "Username",
    Footer: "Username",
    accessor: "username",
  },
  {
    Header: "Email",
    Footer: "Email",
    accessor: "emailAddress",
  },
  {
    Header: "Registered",
    Footer: "Registered",
    accessor: "dateCreated",
    Cell: ({ value }) => {
      // Format value
      if (value) {
        return <div>{handleFormatDate(value, 2)}</div>;
      } else {
        return "-";
      } // close if
    },
  },
  // {
  //   Header: "Actions",
  //   Footer: "Actions",
  //   Cell: ({ cell }) => {
  //     // Define variables
  //     const rowData = cell.row.original;
  //     const rowID = rowData?.id;
  //     const actionsList = [
  //       {
  //         id: "123",
  //         title: "Edit",
  //         link: `/cms/all-hiw-create?id=${rowID}`,
  //       },
  //       {
  //         id: "456",
  //         title: "Preview",
  //         link: `/#homeHiw`,
  //         isBlankTarget: true,
  //       },
  //     ];

  //     // Return tableActionsBtn
  //     return <TableActionsBtn actionsList={actionsList} />;
  //   },
  // },
]; // close export
