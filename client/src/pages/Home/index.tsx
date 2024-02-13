import { Outlet } from "react-router-dom";

const Home = () => {
    return (
        <div className="relative bg-login-2 mt-[58px] p-5 rounded-tl-xl md:mt-80 md:min-h-[calc(100vh-80px)] md:ml-273">
            <Outlet />
        </div>
    );
};

export default Home;
