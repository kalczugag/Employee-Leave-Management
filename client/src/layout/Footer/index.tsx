import { ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

const CopyrightsFooter = ({ children }: Props) => {
    return (
        <footer className="flex flex-col items-center space-y-6 mt-4 text-gray-500">
            {children}
            <p>2024 &copy; Gabriel Kałczuga</p>
        </footer>
    );
};

export default CopyrightsFooter;
