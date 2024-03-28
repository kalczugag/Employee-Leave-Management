import RowActionButtons from "../../../components/Table/RowActionButtons";

export const fields = [
    {
        label: "Employee",
        render: (row) => (
            <div className="flex flex-row items-center space-x-4">
                <div className="w-[120px] h-[60px]">
                    <img
                        src={row.userData?.img || "-"}
                        alt="img"
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-600">
                        {row.userData?.firstName || "-"}{" "}
                        {row.userData?.lastName || "-"}
                    </span>
                    <span>{row.userData?.email || "-"}</span>
                </div>
            </div>
        ),
    },
    {
        label: "Leave Type",
        render: (row) => row.leaveType || "-",
    },
    {
        label: "Application Data",
        render: (row) => row.createdAt || "-",
    },
    {
        label: "Total Day",
        render: (row) => row.totalDay || "-",
    },
    {
        label: "Hod Status",
        render: (row) => row.hodStatus || "-",
    },
    {
        label: "Admin Status",
        render: (row) => row.adminStatus || "-",
    },
    {
        label: "Action",
        render: (row) => (
            <RowActionButtons
                handleDelete={row.handleDelete}
                disabled={row.isLoading}
                id={row._id}
            />
        ),
    },
];
