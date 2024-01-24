import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";

const DashboardPage = () => {
    return (
        <div className="flex flex-col">
            <Header />
            <div className="flex flex-row">
                <Sidebar />
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardPage;
