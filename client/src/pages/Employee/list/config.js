import RowActionButtons from "../../../components/Table/RowActionButtons";

export const fields = [
    {
        label: "Employee",
        render: (row) => (
            <div className="flex flex-row items-center space-x-4">
                <div className="w-[120px] h-[60px]">
                    <img
                        src={row.img}
                        alt="img"
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-600">
                        {row.name}
                    </span>
                    <span>{row.email}</span>
                </div>
            </div>
        ),
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
