import { DashboardOutlined, CallMadeOutlined } from "@mui/icons-material";

export interface CategoriesConfigProps {
    label: string;
    to: string;
    element: JSX.Element;
    access: user["roles"][];
    expendable?: boolean;
}

export const CategoriesConfig: CategoriesConfigProps[] = [
    {
        label: "Dashboard",
        to: "/",
        expendable: false,
        element: <DashboardOutlined />,
        access: ["admin", "hod", "staff"],
    },
    {
        label: "Department",
        to: "/department",
        element: <CallMadeOutlined />,
        access: ["admin", "hod", "staff"],
    },
    {
        label: "Leave Type",
        to: "/leave-type",
        element: <CallMadeOutlined />,
        access: ["admin", "hod", "staff"],
    },
    {
        label: "Employee",
        to: "/employee",
        element: <CallMadeOutlined />,
        access: ["admin", "hod"],
    },
    {
        label: "Leave",
        to: "/leave",
        element: <CallMadeOutlined />,
        access: ["admin", "hod", "staff"],
    },
];
