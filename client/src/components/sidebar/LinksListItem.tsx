import { Accordion } from "./CustomAccordion";
import { AccordionSummary } from "./CustomAccordionSummary";
import { AccordionDetails } from "./CustomAccordionDetails";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";

type Props = {
    label: string;
    to?: string;
    element: JSX.Element;
    index: number;
    expanded: string | false;
    handleChange: (
        panel: string
    ) => (event: React.SyntheticEvent, newExpanded: boolean) => void;
};

const LinksListItem = ({
    label,
    to,
    element,
    index,
    expanded,
    handleChange,
}: Props) => {
    const { pathname } = useLocation();
    const pathRecognition = to ? to : label;
    const isDashboard =
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
            >
                <div className="flex flex-row justify-center text-gray-500">
                    {element}
                    {label.charAt(0).toUpperCase() + label.slice(1)}
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
