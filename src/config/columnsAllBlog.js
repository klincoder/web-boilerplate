// Import resources
import moment from "moment";

// Import custom files
import tw from "../styles/twStyles";
import TableActionsBtn from "../components/TableActionsBtn";
import { handleFormatDate, handleStatusColor } from "./functions";

// Export
export const COLUMNS_ALL_BLOG = [
  // {
  //   id: "row",
  //   Header: "S/NO",
  //   Footer: "S/NO",
  //   maxWidth: 50,
  //   filterable: false,
  //   Cell: ({ row }) => {
  //     return row.index + 1;
  //   },
  // },
  {
    Header: "Created",
    Footer: "Created",
    accessor: "dateCreated",
    Cell: ({ value }) => {
      // If value
      if (value) {
        return <div>{handleFormatDate(value, 1)}</div>;
      } else {
        return "-";
      } // close if
    }, // close cell
  },
  {
    Header: "Title",
    Footer: "Title",
    accessor: "title",
  },
  {
    Header: "Slug",
    Footer: "Slug",
    accessor: "slug",
  },
  {
    Header: "Author",
    Footer: "Author",
    accessor: "username",
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
      const rowSlug = rowData?.slug;
      const actionsList = [
        {
          id: "123",
          title: "Edit Post",
          link: `/cms/all-blog-create?id=${rowID}`,
        },
        {
          id: "456",
          title: "Preview",
          link: `/blog/${rowSlug}`,
          isBlankTarget: true,
        },
      ];

      // Return tableActionsBtn
      return <TableActionsBtn actionsList={actionsList} />;
    }, // close cell
  },
]; // close export
