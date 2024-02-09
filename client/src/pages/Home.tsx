import { Outlet } from "react-router-dom";

const Home = () => {
    return (
        <div className="relative min-h-[calc(100vh-80px)] bg-login-2 mt-80 p-5 rounded-tl-xl md:ml-273">
            <Outlet />
        </div>
    );
};

export default Home;
