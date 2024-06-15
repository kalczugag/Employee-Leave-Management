import CircleBackground from "../../layout/Background";
import AuthContainer from "../../components/Auth";
import { LinearProgress } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";
import { SignType } from "../../enums/signType.enum";

const Auth = () => {
    const { isLoading } = useAuth();

    const { pathname } = useLocation();

    console.log(pathname === SignType.Login);

    return (
        <CircleBackground>
            {isLoading && (
                <LinearProgress
                    sx={{ position: "fixed", top: 0, left: 0, right: 0 }}
                />
            )}
            <AuthContainer />
        </CircleBackground>
    );
};

export default Auth;
