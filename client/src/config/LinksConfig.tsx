interface LinksConfigProps {
    [key: string]: { label: string; to: string; element?: JSX.Element }[];
}

export const LinksConfig: LinksConfigProps = {
    department: [
        { label: "New Department", to: "new" },
        { label: "Department List", to: "list" },
    ],
    leaveType: [{ label: "Leave Type List", to: "list" }],
    employee: [
        { label: "New Employee", to: "new" },
        { label: "Employee List", to: "list" },
    ],
};
