import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../store";

interface Props {
    label: string;
    to: string;
    element?: JSX.Element;
}

const LinksListItem = ({ label, to, element }: Props) => {
    const dispatch = useDispatch();

    return (
        <Link
            to={`/${to}`}
            onClick={() => dispatch(toggleSidebar(false))}
            className={`flex flex-row items-center space-x-2`}
        >
            <div>{element}</div>
            <div>{label.charAt(0).toUpperCase() + label.slice(1)}</div>
        </Link>
    );
};

export default LinksListItem;
