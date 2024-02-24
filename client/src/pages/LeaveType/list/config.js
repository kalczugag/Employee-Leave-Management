import RowActionButtons from "../../../components/Table/RowActionButtons";
import Status from "../../../components/TableStatus";

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
    {
        label: "Action",
        render: (row) => <RowActionButtons id={row._id} />,
    },
];

const rows = [
    {
        _id: 1,
        name: "Other",
        details: "Other",
        createdOn: "6 Nov 2022",
        status: true,
    },
    {
        _id: 2,
        name: "Medical Leave",
        details: "Other",
        createdOn: "6 Nov 2022",
        status: true,
    },
    {
        _id: 3,
        name: "Other",
        details: "Other",
        createdOn: "6 Nov 2022",
        status: false,
    },
    {
        _id: 4,
        name: "Casual Leave",
        details: "N/A",
        createdOn: "6 Nov 2022",
        status: true,
    },
    {
        _id: 5,
        name: "Casual Leave",
        details: "Other",
        createdOn: "6 Nov 2022",
        status: true,
    },
    {
        _id: 6,
        name: "Other",
        details: "N/A",
        createdOn: "6 Nov 2022",
        status: true,
    },
];

export const config = { headerOptions, rows };
