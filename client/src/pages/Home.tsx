import { Outlet } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <div className="bg-login-2 mt-80 p-5 rounded-tl-xl h-screen-fit md:ml-273">
                <Outlet />
            </div>
        </div>
    );
};

export default Home;
