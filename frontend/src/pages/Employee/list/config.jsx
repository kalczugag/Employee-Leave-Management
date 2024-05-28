import RowActionButtons from "../../../components/Table/RowActionButtons";
import ProfileCell from "../../../components/ProfileCell";

export const fields = [
    {
        label: "Employee",
        render: (row) => <ProfileCell data={row} />,
    },
    { label: "Employee Mobile", render: (row) => row.mobile || "-" },
    { label: "Employee Address", render: (row) => row.address || "-" },
    {
        label: "Employee Roles",
        render: (row) => row.roles || "-",
    },
    { label: "Created On", render: (row) => row.createdAt },
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
