import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { AppDispatch, getUser } from "../../store";
import useAuth from "../../hooks/useAuth";

const PrivateOutlet = () => {
    const auth = useAuth();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!auth.isAuthenticated && !auth.data) {
                    await dispatch(getUser());
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, [auth.isAuthenticated, auth.data, dispatch]);

    if (!auth.isAuthenticated && !auth.data) {
        return <div>Loading...</div>;
    }

    return auth.isAuthenticated ? (
        <div className="relative bg-login-2 mt-[58px] p-5 rounded-tl-xl md:mt-80 md:min-h-[calc(100vh-80px)] md:ml-273">
            <Outlet />
        </div>
    ) : (
        <Navigate to="/login" replace />
    );
};

export default PrivateOutlet;
