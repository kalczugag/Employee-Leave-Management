import RowActionButtons from "../../components/Table/RowActionButtons";

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
        render: (row) =>
            (
                <span
                    className={`border-b-2 ${
                        row.hodStatus === "pending"
                            ? "border-[#ff9800]"
                            : row.hodStatus === "approved"
                            ? "border-[#4caf50]"
                            : "border-[#f44336]"
                    }`}
                >
                    {row.hodStatus}
                </span>
            ) || "-",
    },
    {
        label: "Admin Status",
        render: (row) =>
            (
                <span
                    className={`border-b-2 ${
                        row.adminStatus === "pending"
                            ? "border-[#ff9800]"
                            : row.adminStatus === "approved"
                            ? "border-[#4caf50]"
                            : "border-[#f44336]"
                    }`}
                >
                    {row.adminStatus}
                </span>
            ) || "-",
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
