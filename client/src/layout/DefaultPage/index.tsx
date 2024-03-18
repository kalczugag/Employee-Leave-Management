import { ReactNode } from "react";
import Footer from "../../components/Footer";

interface Props {
    children: ReactNode;
    label: string;
    bg?: boolean;
    footer?: boolean;
}

const DefaultPage = ({ children, label, bg, footer = true }: Props) => {
    return (
        <div className="flex flex-col">
            <div className="flex-1 flex flex-col space-y-4">
                <h3 className="font-semibold text-gray-500 text-lg">{label}</h3>
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
