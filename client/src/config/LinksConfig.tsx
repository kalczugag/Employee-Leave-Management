import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

interface LinksConfigProps {
    [key: string]: { label: string; to: string; element?: JSX.Element }[];
}

const ICON_SIZE = 18;

export const LinksConfig: LinksConfigProps = {
    department: [
        {
            label: "New Department",
            to: "new",
            element: <PersonAddOutlinedIcon sx={{ fontSize: ICON_SIZE }} />,
        },
        {
            label: "Department List",
            to: "list",
            element: <CircleOutlinedIcon sx={{ fontSize: ICON_SIZE }} />,
        },
    ],
    leaveType: [
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
        },
        {
            label: "Employee List",
            to: "list",
            element: <CircleOutlinedIcon sx={{ fontSize: ICON_SIZE }} />,
        },
    ],
};
