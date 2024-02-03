import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";

interface IOptions {
    label: string;
    to?: string;
    element: JSX.Element;
    expendable?: boolean;
}

export const LinksConfig: IOptions[] = [
    {
        label: "dashboard",
        expendable: false,
        element: <DashboardOutlinedIcon />,
    },
    { label: "department", element: <CallMadeOutlinedIcon /> },
    {
        label: "Leave Type",
        to: "leavetype",
        element: <CallMadeOutlinedIcon />,
    },
    { label: "employee", element: <CallMadeOutlinedIcon /> },
    { label: "leave", element: <CallMadeOutlinedIcon /> },
];
