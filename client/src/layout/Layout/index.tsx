import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { SignType } from "../../enums/signType.enum";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

interface Props {
    children: ReactNode;
}

const Layout = ({ children }: Props) => {
    const { pathname } = useLocation();
    const isAuthPage =
        SignType.Login === pathname || SignType.Register === pathname;

    return (
        <div className="h-screen overflow-hidden">
            {!isAuthPage && (
                <>
                    <Header />
                    <Sidebar />
                </>
            )}
            {children}
        </div>
    );
};

export default Layout;
