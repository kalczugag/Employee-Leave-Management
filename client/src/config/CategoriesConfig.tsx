import { DashboardOutlined, CallMadeOutlined } from "@mui/icons-material";

type UserRole = "admin" | "hod" | "all"; //"all" means that every existing role can access to see the panel

export interface CategoriesConfigProps {
    label: string;
    to: string;
    element: JSX.Element;
    access: UserRole[];
    expendable?: boolean;
}

export const CategoriesConfig: CategoriesConfigProps[] = [
    {
        label: "Dashboard",
        to: "/",
        expendable: false,
        element: <DashboardOutlined />,
        access: ["all"],
    },
    {
        label: "Department",
        to: "/department",
        element: <CallMadeOutlined />,
        access: ["all"],
    },
    {
        label: "Leave Type",
        to: "/leave-type",
        element: <CallMadeOutlined />,
        access: ["all"],
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
        access: ["admin", "hod"],
    },
];
