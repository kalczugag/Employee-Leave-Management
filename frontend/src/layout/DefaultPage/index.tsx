import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import BasicBreadcrumbs from "../../components/BasicBreadcrumbs";

interface Props {
    children?: ReactNode;
    label?: string;
    bg?: boolean;
    footer?: boolean;
    breadCrumbs?: boolean;
}

const DefaultPage = ({
    children,
    label,
    bg,
    footer = true,
    breadCrumbs = true,
}: Props) => {
    const { pathname } = useLocation();

    const links = pathname.split("/");
    const breadcrumbLinks = links.map((link, index) => ({
        label: link.charAt(0).toUpperCase() + link.slice(1).toLowerCase(),
        path: `${links.slice(0, index + 1).join("/")}`,
    }));

    return (
        <div className="relative flex flex-col md:mx-10">
            <div className="flex-1 flex flex-col space-y-4">
                <div className="flex flex-row justify-between items-center">
                    <h3 className="font-semibold text-gray-500 text-lg">
                        {label}
                    </h3>
                    {breadCrumbs && (
                        <BasicBreadcrumbs links={breadcrumbLinks} />
                    )}
                </div>
                {bg ? (
                    <div className="flex flex-col space-y-5 bg-white p-5 rounded">
                        {children}
                    </div>
                ) : (
                    <>{children}</>
                )}
            </div>
            {footer && <Footer buttons />}
        </div>
    );
};

export default DefaultPage;
