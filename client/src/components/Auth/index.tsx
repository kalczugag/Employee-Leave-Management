import { useLocation } from "react-router-dom";
import LoginForm from "../../forms/LoginForm";
import RegisterForm from "../../forms/RegisterForm";
import { SignType } from "../../enums/signType.enum";

const AuthContainer = () => {
    const { pathname } = useLocation();

    return (
        <div>
            {pathname === SignType.Login ? <LoginForm /> : <RegisterForm />}
        </div>
    );
};

export default AuthContainer;
