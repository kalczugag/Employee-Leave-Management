import { Link, useLocation } from "react-router-dom";

interface Props {
    label: string;
    to: string;
    element?: JSX.Element;
}

const LinksListItem = ({ label, to, element }: Props) => {
    const { pathname } = useLocation();
    console.log(to.split("/")[1]);

    return (
        <Link
            to={`/${to}`}
            className={`flex flex-row items-center md:space-x-2`}
        >
            <div>{element}</div>
            <div className="hidden md:block">
                {label.charAt(0).toUpperCase() + label.slice(1)}
            </div>
        </Link>
    );
};

export default LinksListItem;
