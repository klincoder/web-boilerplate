// Import resources
import moment from "moment";

// Import custom files
import tw from "../styles/twStyles";
import TableActionsBtn from "../components/TableActionsBtn";
import { handleStatusColor } from "./functions";

// Export
export const COLUMNS_ALL_CONTACT = [
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
    Header: "Name",
    Footer: "Name",
    accessor: "fullName",
  },
  {
    Header: "Email",
    Footer: "Email",
    accessor: "emailAddress",
  },
  {
    Header: "Message",
    Footer: "Message",
    accessor: "message",
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
  //         link: `/cms/all-faqs-create?id=${rowID}`,
  //       },
  //       {
  //         id: "456",
  //         title: "Preview",
  //         link: `/faqs`,
  //         isBlankTarget: true,
  //       },
  //     ];

  //     // Return tableActionsBtn
  //     return <TableActionsBtn actionsList={actionsList} />;
  //   }, // close cell
  // },
]; // close export
