import CircleBackground from "../components/CircleBackground";
import LoginWindow from "../components/auth/LoginWindow";
import RegisterWindow from "../components/auth/RegisterWindow";

export enum SignType {
    Login = "login",
    Register = "register",
}

type Props = {
    action: SignType;
};

const SignPage = ({ action }: Props) => {
    return (
        <CircleBackground>
            {action === SignType.Login ? <LoginWindow /> : <RegisterWindow />}
        </CircleBackground>
    );
};

export default SignPage;
