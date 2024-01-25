import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import CallMadeIcon from "@mui/icons-material/CallMade";
import LinksListItem from "./LinksListItem";

const LinksList = () => {
    const options = [
        { label: "dashboard", element: <DashboardOutlinedIcon /> },
        {
            label: "Leave Type",
            to: "leavetype",
            element: <CallMadeIcon />,
        },
        { label: "employee", element: <CallMadeIcon /> },
        { label: "leave", element: <CallMadeIcon /> },
    ];

    const renderedLinks = options.map(({ label, to, element }) => {
        return (
            <LinksListItem
                key={label}
                label={label}
                to={to}
                element={element}
            />
        );
    });

    return <div className="flex flex-col space-y-4">{renderedLinks}</div>;
};

export default LinksList;
