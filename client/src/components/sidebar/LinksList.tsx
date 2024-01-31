import { useState } from "react";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";
import LinksListItem from "./LinksListItem";

const options = [
    { label: "dashboard", element: <DashboardOutlinedIcon /> },
    { label: "department", element: <CallMadeOutlinedIcon /> },
    {
        label: "Leave Type",
        to: "leavetype",
        element: <CallMadeOutlinedIcon />,
    },
    { label: "employee", element: <CallMadeOutlinedIcon /> },
    { label: "leave", element: <CallMadeOutlinedIcon /> },
];

const LinksList = () => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    const renderedLinks = options.map(({ label, to, element }, index) => {
        return (
            <LinksListItem
                key={label}
                label={label}
                to={to}
                element={element}
                index={index++}
                expanded={expanded}
                handleChange={handleChange}
            />
        );
    });

    return <div className="flex flex-col space-y-2">{renderedLinks}</div>;
};

export default LinksList;
