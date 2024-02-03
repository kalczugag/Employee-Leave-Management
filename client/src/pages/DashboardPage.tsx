import { Outlet } from "react-router-dom";
import Header from "@components/header/Header";
import Sidebar from "@components/sidebar/Sidebar";

const DashboardPage = () => {
    return (
        <div>
            <Header />
            <Sidebar />
            <div className="bg-login-2 pt-80 pl-273 w-screen h-screen">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardPage;
