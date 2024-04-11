import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
    children?: ReactNode;
    buttons?: boolean;
    center?: boolean;
    spacing?: boolean;
}

const Footer = ({ children, buttons, center, spacing }: Props) => {
    return (
        <div className={`mt-6 border-t ${spacing && "mt-10 pt-2 px-4"}`}>
            {buttons ? (
                <div className="flex flex-col items-center justify-between text-sm text-gray-500 md:items-start md:flex-row">
                    <p>2024 &copy; Gabriel Kałczuga</p>
                    <div className="flex flex-row items-end space-x-4">
                        <Link to="/about">About</Link>
                        <Link to="/support">Support</Link>
                        <Link to="/contact">Contact Us</Link>
                    </div>
                </div>
            ) : (
                <footer
                    className={`flex flex-col space-y-2 mt-3 text-gray-500 ${
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
