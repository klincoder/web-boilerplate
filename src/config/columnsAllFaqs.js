// Import resources
import moment from "moment";

// Import custom files
import tw from "../styles/twStyles";
import TableActionsBtn from "../components/TableActionsBtn";
import { handleStatusColor } from "./functions";

// Export
export const COLUMNS_ALL_FAQS = [
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
    Header: "Question",
    Footer: "Question",
    accessor: "question",
  },
  {
    Header: "Category",
    Footer: "Category",
    accessor: "category",
  },
  {
    Header: "Status",
    Footer: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      // Format value
      if (value) {
        return (
          <div className={`${tw?.badgeColor} ${handleStatusColor(value)}`}>
            {value}
          </div>
        );
      } else {
        return "-";
      } // close if
    }, // close cell
  },
  {
    Header: "Actions",
    Footer: "Actions",
    Cell: ({ cell }) => {
      // Define variables
      const rowData = cell.row.original;
      const rowID = rowData?.id;
      const actionsList = [
        {
          id: "123",
          title: "Edit",
          link: `/cms/all-faqs-create?id=${rowID}`,
        },
        {
          id: "456",
          title: "Preview",
          link: `/faqs`,
          isBlankTarget: true,
        },
      ];

      // Return tableActionsBtn
      return <TableActionsBtn actionsList={actionsList} />;
    }, // close cell
  },
]; // close export
