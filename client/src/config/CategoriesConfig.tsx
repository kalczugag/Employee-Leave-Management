import { DashboardOutlined, CallMadeOutlined } from "@mui/icons-material";

interface CategoriesConfigProps {
    label: string;
    to: string;
    element: JSX.Element;
    expendable?: boolean;
}

export const CategoriesConfig: CategoriesConfigProps[] = [
    {
        label: "Dashboard",
        to: "/",
        expendable: false,
        element: <DashboardOutlined />,
    },
    {
        label: "Department",
        to: "/department",
        element: <CallMadeOutlined />,
    },
    {
        label: "Leave Type",
        to: "/leave-type",
        element: <CallMadeOutlined />,
    },
    { label: "Employee", to: "/employee", element: <CallMadeOutlined /> },
    { label: "Leave", to: "/leave", element: <CallMadeOutlined /> },
];
