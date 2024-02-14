import RowActionButtons from "../../components/Table/RowActionButtons";
import Status from "../../components/Status";

const headerOptions = [
    { label: "Department Name", render: (row) => row.name },
    { label: "Department Details", render: (row) => row.details },
    { label: "Created On", render: (row) => row.createdOn },
    {
        label: "Department Status",
        render: (row) => <Status status={row.status} />,
    },
    { label: "Action", render: () => <RowActionButtons /> },
];

const rows = [
    {
        name: "Library dep",
        details: "Library dep",
        createdOn: "8 Nov 2022",
        status: true,
    },
    {
        name: "Library dep",
        details: "Library dep",
        createdOn: "8 Nov 2022",
        status: true,
    },
    {
        name: "Library dep",
        details: "Library dep",
        createdOn: "8 Nov 2022",
        status: false,
    },
    {
        name: "Library dep",
        details: "Library dep",
        createdOn: "8 Nov 2022",
        status: true,
    },
    {
        name: "Library dep",
        details: "Library dep",
        createdOn: "8 Nov 2022",
        status: true,
    },
    {
        name: "Library dep",
        details: "Library dep",
        createdOn: "8 Nov 2022",
        status: true,
    },
    {
        name: "Library dep",
        details: "Library dep",
        createdOn: "8 Nov 2022",
        status: true,
    },
    {
        name: "Library dep8",
        details: "Library dep",
        createdOn: "8 Nov 2022",
        status: true,
    },
];

export const config = { headerOptions, rows };
