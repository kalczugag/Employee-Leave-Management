import { ReactNode } from "react";
import CopyrightsFooter from "../Footer";

interface Props {
    children: ReactNode;
    label: string;
    footer?: boolean;
}

const DefaultPage = ({ children, label, footer = true }: Props) => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 flex flex-col space-y-6">
                <h3 className="font-semibold text-gray-500">{label}</h3>
                {children}
            </div>
            {footer && (
                <div className="flex flex-col justify-between text-sm text-gray-500 border-t md:flex-row">
                    <div>
                        <CopyrightsFooter />
                    </div>
                    <div className="flex flex-row items-end space-x-4">
                        <a href="#">About</a>
                        <a href="#">Support</a>
                        <a href="#">Contact Us</a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DefaultPage;
