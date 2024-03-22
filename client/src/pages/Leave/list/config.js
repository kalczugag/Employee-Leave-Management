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
    {
        label: "Leave Type",
        render: (row) => row.leaveType || "",
    },
    {
        label: "Application Data",
        render: (row) => row.createdAt || "",
    },
    {
        label: "Total Day",
        render: (row) => row.totalDay || "",
    },
    {
        label: "Hod Status",
        render: (row) => row.hodStatus || "",
    },
    {
        label: "Admin Status",
        render: (row) => row.adminStatus || "",
    },
    {
        label: "Action",
        render: (row) => <RowActionButtons id={row._id} />,
    },
];
