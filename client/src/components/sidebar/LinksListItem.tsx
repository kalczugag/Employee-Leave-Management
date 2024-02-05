import { Link } from "react-router-dom";

type Props = {
    label: string;
    to: string;
    element?: JSX.Element;
};

const LinksListItem = ({ label, to, element }: Props) => {
    return (
        <Link
            to={`/${to}`}
            className={`flex flex-row items-center hover:text-gray-700 md:space-x-2`}
        >
            <div>{element}</div>
            <div className="hidden md:block">
                {label.charAt(0).toUpperCase() + label.slice(1)}
            </div>
        </Link>
    );
};

export default LinksListItem;
