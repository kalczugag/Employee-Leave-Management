import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

interface LinksConfigProps {
    [key: string]: {
        label: string;
        to: string;
        element?: JSX.Element;
        access?: user["roles"][];
    }[];
}

const ICON_SIZE = 18;

export const LinksConfig: LinksConfigProps = {
    department: [
        {
            label: "New Department",
            to: "new",
            element: <PersonAddOutlinedIcon sx={{ fontSize: ICON_SIZE }} />,
            access: ["admin", "hod"],
        },
        {
            label: "Department List",
            to: "list",
            element: <CircleOutlinedIcon sx={{ fontSize: ICON_SIZE }} />,
        },
    ],
    leaveType: [
        {
            label: "New Leave Type",
            to: "new",
            element: <PersonAddOutlinedIcon sx={{ fontSize: ICON_SIZE }} />,
            access: ["admin", "hod"],
        },
        {
            label: "Leave Type List",
            to: "list",
            element: <CircleOutlinedIcon sx={{ fontSize: ICON_SIZE }} />,
        },
    ],
    employee: [
        {
            label: "New Employee",
            to: "new",
            element: <PersonAddOutlinedIcon sx={{ fontSize: ICON_SIZE }} />,
            access: ["admin", "hod"],
        },
        {
            label: "Employee List",
            to: "list",
            element: <CircleOutlinedIcon sx={{ fontSize: ICON_SIZE }} />,
        },
    ],
    leave: [
        {
            label: "New Leave",
            to: "new",
            element: <CircleOutlinedIcon sx={{ fontSize: ICON_SIZE }} />,
            access: ["staff"],
        },
        {
            label: "Leave List",
            to: "list",
            element: <CircleOutlinedIcon sx={{ fontSize: ICON_SIZE }} />,
        },
        {
            label: "Leave List Pending",
            to: "list-pending",
            element: <CircleOutlinedIcon sx={{ fontSize: ICON_SIZE }} />,
        },
        {
            label: "Leave List Approved",
            to: "list-approved",
            element: <CircleOutlinedIcon sx={{ fontSize: ICON_SIZE }} />,
        },
        {
            label: "Leave List Rejected",
            to: "list-rejected",
            element: <CircleOutlinedIcon sx={{ fontSize: ICON_SIZE }} />,
        },
    ],
};
