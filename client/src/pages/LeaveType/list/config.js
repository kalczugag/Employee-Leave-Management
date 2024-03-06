import RowActionButtons from "../../../components/Table/RowActionButtons";
import Status from "../../../components/TableStatus";

export const fields = [
    {
        label: "Leave Type Name",
        render: (row) => row.name,
    },
    { label: "Leave Type Details", render: (row) => row.details },
    { label: "Created At", render: (row) => row.createdAt },
    {
        label: "Leave Type Status",
        render: (row) => <Status status={row.active} />,
    },
    {
        label: "Action",
        render: (row) => <RowActionButtons id={row._id} />,
    },
];
