import { DashboardOutlined, CallMadeOutlined } from "@mui/icons-material";

interface CategoriesConfigProps {
    label: string;
    to: string;
    element: JSX.Element;
    admin: boolean;
    expendable?: boolean;
}

export const CategoriesConfig: CategoriesConfigProps[] = [
    {
        label: "Dashboard",
        to: "/",
        expendable: false,
        element: <DashboardOutlined />,
        admin: false,
    },
    {
        label: "Department",
        to: "/department",
        element: <CallMadeOutlined />,
        admin: true,
    },
    {
        label: "Leave Type",
        to: "/leave-type",
        element: <CallMadeOutlined />,
        admin: true,
    },
    {
        label: "Employee",
        to: "/employee",
        element: <CallMadeOutlined />,
        admin: true,
    },
    {
        label: "Leave",
        to: "/leave",
        element: <CallMadeOutlined />,
        admin: false,
    },
];
