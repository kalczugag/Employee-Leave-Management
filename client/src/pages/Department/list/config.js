import RowActionButtons from "../../../components/Table/RowActionButtons";
import Status from "../../../components/TableStatus";

export const fields = [
    { label: "Department Name", render: (row) => row.name || "-" },
    { label: "Department Details", render: (row) => "-" },
    { label: "Created At", render: (row) => row.createdAt },
    {
        label: "Department Status",
        render: (row) => <Status status={row.active} />,
    },
    {
        label: "Action",
        render: (row) => (
            <>
                {row.userRole !== "staff" ? (
                    <RowActionButtons
                        id={row._id}
                        disabled={row.isLoading}
                        handleDelete={row.handleDelete}
                    />
                ) : (
                    <span>No actions available</span>
                )}
            </>
        ),
    },
];
