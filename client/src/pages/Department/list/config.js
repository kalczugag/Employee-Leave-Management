import RowActionButtons from "../../../components/Table/RowActionButtons";
import Status from "../../../components/TableStatus";

export const fields = [
    { label: "Department Name", render: (row) => row.name },
    { label: "Department Details", render: (row) => "..." },
    { label: "Created At", render: (row) => row.createdAt },
    {
        label: "Department Status",
        render: (row) => <Status status={row.active} />,
    },
    { label: "Action", render: () => <RowActionButtons /> },
];
