import { Navigate, Outlet } from "react-router-dom";
import { useFetchUserQuery } from "../store";
import useAuth from "../hooks/useAuth";
import Layout from "../layout/Layout";

const PrivateOutlet = () => {
    const auth = useAuth();
    // if (!auth.isAuthenticated && !auth.user) {
    //     return <div>Loading...</div>;
    // }

    return auth.isAuthenticated ? (
        <div className="relative bg-login-2 mt-[58px] p-5 rounded-tl-xl md:mt-80 md:min-h-[calc(100vh-80px)] md:ml-273">
            <Layout>
                <Outlet />
            </Layout>
            efv
        </div>
    ) : (
        <Navigate to="/login" replace />
    );
};

export default PrivateOutlet;
