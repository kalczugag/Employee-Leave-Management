import { useLocation } from "react-router-dom";
import Logo from "../components/Logo";
import Footer from "../components/Footer";

const NotFound = () => {
    const { pathname } = useLocation();

    return (
        <>
            <div className="flex flex-col justify-center items-center space-x-10 h-[calc(100vh-80px)] my-auto md:flex-row">
                <div className="flex flex-col items-start space-y-2">
                    <Logo />
                    <p>
                        <span className="font-bold">404.</span>{" "}
                        <span className="text-gray-500">That's an error.</span>
                    </p>
                    <p>The requested URL {pathname}</p>
                </div>
                <img
                    className="w-64 h-64 object-contain"
                    src="/images/404.jpg"
                    alt="Error page not found"
                />
            </div>
            <Footer buttons spacing />
        </>
    );
};

export default NotFound;
