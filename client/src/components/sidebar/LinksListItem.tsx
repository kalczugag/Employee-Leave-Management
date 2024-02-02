import { Accordion } from "./CustomAccordion";
import { AccordionSummary } from "./CustomAccordionSummary";
import { AccordionDetails } from "./CustomAccordionDetails";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";

type Props = {
    label: string;
    to?: string;
    element: JSX.Element;
    expendable?: boolean;
    index: number;
    expanded: string | false;
    handleChange: (
        panel: string
    ) => (event: React.SyntheticEvent, newExpanded: boolean) => void;
};

const LinksListItem = ({
    label,
    to,
    expendable,
    element,
    index,
    expanded,
    handleChange,
}: Props) => {
    const { pathname } = useLocation();
    const pathRecognition = to ? to : label;
    const isIndexRoute =
        label.startsWith("dashboard") || to?.startsWith("dashboard");

    // to={`/dashboard${isDashboard ? "" : `/${pathRecognition}`}`}

    return (
        <Accordion
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
        >
            <AccordionSummary
                aria-controls={`panel${index}d-content`}
                id={`panel${index}d-header`}
                className="space-x-16"
            >
                <div className="flex flex-row text-gray-500 items-center md:space-x-2">
                    <div>{element}</div>
                    <div className="hidden md:block">
                        {label.charAt(0).toUpperCase() + label.slice(1)}
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                {/* <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                    blandit leo lobortis eget.
                </Typography> */}
            </AccordionDetails>
        </Accordion>
    );
};

export default LinksListItem;
