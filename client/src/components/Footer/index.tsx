import { ReactNode } from "react";

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
                        <a href="#">About</a>
                        <a href="#">Support</a>
                        <a href="#">Contact Us</a>
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
