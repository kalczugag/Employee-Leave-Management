export const fields = [
    {
        label: "Employee",
        render: (row) => (
            <div className="flex flex-row items-center space-x-4">
                <div className="w-12 h-12">
                    <img src={row.img} alt="img" />
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
        render: (row) => row.roles && <div>{row.roles.join(", ")}</div>,
    },
    { label: "Created On", render: (row) => row.createdAt },
];
