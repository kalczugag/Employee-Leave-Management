import { useLocation } from "react-router-dom";
import LoginWindow from "./LoginWindow";
import RegisterWindow from "./RegisterWindow";
import { SignType } from "../../enums/signType";

const AuthContainer = () => {
    const { pathname } = useLocation();

    return (
        <div>
            {pathname === SignType.Login ? <LoginWindow /> : <RegisterWindow />}
        </div>
    );
};

export default AuthContainer;
