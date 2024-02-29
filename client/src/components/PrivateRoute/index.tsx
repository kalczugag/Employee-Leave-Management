import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface Props {
    children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.user);

    return <>{isAuthenticated ? children : <Navigate to="/login" />}</>;
};

export default PrivateRoute;
