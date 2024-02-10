import { ReactNode } from "react";

interface Props {
    children?: ReactNode;
    buttons?: boolean;
    center?: boolean;
}

const Footer = ({ children, buttons = false, center = false }: Props) => {
    return (
        <div className="pt-3 mt-6 border-t">
            {buttons ? (
                <div className="flex flex-col items-center justify-between text-sm text-gray-500 md:items-start md:flex-row">
                    <p>2024 &copy; Gabriel Kałczuga</p>
                    <div className="flex flex-row items-end space-x-4">
                        <a href="#">About</a>
                        <a href="#">Support</a>
                        <a href="#">Contact Us</a>
                    </div>
                </div>
            ) : (
                <footer
                    className={`flex flex-col space-y-6 mt-4 text-gray-500 ${
                        center && "items-center"
                    }`}
                >
                    {children}
                    <p>2024 &copy; Gabriel Kałczuga</p>
                </footer>
            )}
        </div>
    );
};

export default Footer;
