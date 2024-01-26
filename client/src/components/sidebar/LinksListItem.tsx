import "../../assets/styles/sidebar.css";
import { Link, useLocation } from "react-router-dom";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";

type Props = {
    label: string;
    to?: string;
    element: JSX.Element;
};

const LinksListItem = ({ label, to, element }: Props) => {
    const { pathname } = useLocation();
    const pathRecognition = to ? to : label;
    const isDashboard =
        label.startsWith("dashboard") || to?.startsWith("dashboard");

    return (
        <Link
            to={`/dashboard${isDashboard ? "" : `/${pathRecognition}`}`}
            className={`link-icon py-1 ${
                pathname.endsWith(pathRecognition) && "link-icon--active"
            }`}
        >
            <div className="link-icon__first-child space-x-3">
                {element}
                <span>{label.charAt(0).toUpperCase() + label.slice(1)}</span>
            </div>
            <NavigateNextOutlinedIcon />
        </Link>
    );
};

export default LinksListItem;
