import RowActionButtons from "../../components/Table/RowActionButtons";
import Status from "../../components/Status";

const headerOptions = [
    {
        label: "Leave Type Name",
        render: (row) => row.name,
    },
    { label: "Leave Type Details", render: (row) => row.details },
    { label: "Created On", render: (row) => row.createdOn },
    {
        label: "Leave Type Status",
        render: (row) => <Status status={row.status} />,
    },
    { label: "Action", render: () => <RowActionButtons /> },
];

const rows = [
    {
        name: "Other",
        details: "Other",
        createdOn: "6 Nov 2022",
        status: true,
    },
    {
        name: "Medical Leave",
        details: "Other",
        createdOn: "6 Nov 2022",
        status: true,
    },
    {
        name: "Other",
        details: "Other",
        createdOn: "6 Nov 2022",
        status: false,
    },
    {
        name: "Casual Leave",
        details: "N/A",
        createdOn: "6 Nov 2022",
        status: true,
    },
    {
        name: "Casual Leave",
        details: "Other",
        createdOn: "6 Nov 2022",
        status: true,
    },
    {
        name: "Other",
        details: "N/A",
        createdOn: "6 Nov 2022",
        status: true,
    },
];

export const config = { headerOptions, rows };
