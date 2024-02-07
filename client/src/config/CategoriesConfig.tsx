import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";

interface IOptions {
    label: string;
    to: string;
    element: JSX.Element;
    expendable?: boolean;
}

export const CategoriesConfig: IOptions[] = [
    {
        label: "Dashboard",
        to: "/",
        expendable: false,
        element: <DashboardOutlinedIcon />,
    },
    {
        label: "Department",
        to: "/department",
        element: <CallMadeOutlinedIcon />,
    },
    {
        label: "Leave Type",
        to: "/leavetype",
        element: <CallMadeOutlinedIcon />,
    },
    { label: "Employee", to: "/employee", element: <CallMadeOutlinedIcon /> },
    { label: "leave", to: "/leave", element: <CallMadeOutlinedIcon /> },
];
