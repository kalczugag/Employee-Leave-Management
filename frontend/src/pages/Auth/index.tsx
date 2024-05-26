import CircleBackground from "../../layout/Background";
import AuthContainer from "../../components/Auth";
import { LinearProgress } from "@mui/material";
import useAuth from "../../hooks/useAuth";

const Auth = () => {
    const { isLoading } = useAuth();

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
