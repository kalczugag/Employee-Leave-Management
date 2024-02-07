import { useLocation } from "react-router-dom";
import LoginWindow from "./LoginWindow";
import RegisterWindow from "./RegisterWindow";

enum SignType {
    Login = "/login",
    Register = "/register",
}

const AuthContainer = () => {
    const { pathname } = useLocation();

    return (
        <div>
            {pathname === SignType.Login ? <LoginWindow /> : <RegisterWindow />}
        </div>
    );
};

export default AuthContainer;
