import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { SignType } from "../../enums/signType.enum";
import { LinearProgress } from "@mui/material";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

interface Props {
    children: ReactNode;
}

const Layout = ({ children }: Props) => {
    const { pathname } = useLocation();
    const isLoading = useSelector((state: RootState) => {
        if (state.user.isLoading) {
            return true;
        }

        return false;
    });

    const isAuthPage =
        SignType.Login === pathname || SignType.Register === pathname;

    return (
        <div>
            {!isAuthPage && (
                <>
                    <Header />

                    <Sidebar />
                </>
            )}
            {isLoading && (
                <LinearProgress
                    sx={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: "100",
                    }}
                />
            )}
            {children}
        </div>
    );
};

export default Layout;
