import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useThunk from "../hooks/useThunk";
import { getUser } from "../store";
import useAuth from "../hooks/useAuth";
import Layout from "../layout/Layout";
import { Backdrop, CircularProgress } from "@mui/material";
import { SignType } from "../enums/signType.enum";

const PrivateOutlet = () => {
    const auth = useAuth();
    const { pathname } = useLocation();
    const [doFetchUser] = useThunk(getUser);

    useEffect(() => {
        const fetchData = () => {
            try {
                if (!auth.isAuthenticated && !auth.user) {
                    doFetchUser();
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, [auth.isAuthenticated, auth.user, doFetchUser]);

    if (!auth.isAuthenticated && !auth.user) {
        return (
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    const isAuthLocation =
        pathname === SignType.Login ||
        pathname === SignType.Register ||
        pathname === SignType.Reset;

    return auth.isAuthenticated && !isAuthLocation ? (
        <div className="relative bg-login-2 mt-[58px] p-5 rounded-tl-xl md:mt-80 md:min-h-[calc(100vh-80px)] md:ml-273">
            <Layout>
                <Outlet />
            </Layout>
        </div>
    ) : auth.isAuthenticated && isAuthLocation ? (
        <Navigate to="/" replace />
    ) : (
        <Navigate to="/login" replace />
    );
};

export default PrivateOutlet;
