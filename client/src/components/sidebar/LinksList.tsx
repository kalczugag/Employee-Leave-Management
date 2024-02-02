import { useState } from "react";
import { LinksConfig as options } from "../../utils/config/LinksConfig";
import LinksListItem from "./LinksListItem";

const LinksList = () => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    const renderedLinks = options.map(
        ({ label, to, element, expendable }, index) => {
            return (
                <LinksListItem
                    key={label}
                    label={label}
                    to={to}
                    element={element}
                    expendable={expendable}
                    index={index++}
                    expanded={expanded}
                    handleChange={handleChange}
                />
            );
        }
    );

    return <div className="flex flex-col space-y-2">{renderedLinks}</div>;
};

export default LinksList;
