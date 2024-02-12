import { Link, NavLink, useLocation } from "react-router-dom";
import { Accordion } from "../CustomAccordion";
import { AccordionSummary } from "../CustomAccordion";
import { AccordionDetails } from "../CustomAccordion";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { removeSpacesAndCamelCase } from "../../utils/removeSpacesAndCamelCase";
import LinksList from "./LinksList";

interface Props {
    label: string;
    to: string;
    element: JSX.Element;
    expendable?: boolean;
    index: number;
    expanded: string | false;
    handleChange: (
        panel: string
    ) => (event: React.SyntheticEvent, newExpanded: boolean) => void;
}

const CategoryListItem = ({
    label,
    to,
    expendable = true,
    element,
    index,
    expanded,
    handleChange,
}: Props) => {
    const { pathname } = useLocation();
    // const isActive = to.endsWith(pathname.split("/")[1])
    //     ? " text-blue-500"
    //     : "text-gray-500";
    const resultLabel = removeSpacesAndCamelCase(label);

    return (
        <>
            {expendable ? (
                <Accordion
                    expanded={expanded === `panel${index}`}
                    onChange={handleChange(`panel${index}`)}
                >
                    <AccordionSummary
                        aria-controls={`panel${index}d-content`}
                        id={`panel${index}d-header`}
                        expandIcon={
                            expendable && (
                                <ArrowForwardIosSharpIcon
                                    sx={{ fontSize: "0.9rem" }}
                                />
                            )
                        }
                        className="space-x-16"
                    >
                        <div
                            className={`flex flex-row items-center space-x-2 hover:text-gray-700`}
                        >
                            <div>{element}</div>
                            <div>{label}</div>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <LinksList target={resultLabel} />
                    </AccordionDetails>
                </Accordion>
            ) : (
                <NavLink to={to}>
                    <div
                        className={`flex flex-row items-center px-4 my-3 space-x-2`}
                    >
                        <div>{element}</div>
                        <div>{label}</div>
                    </div>
                </NavLink>
            )}
        </>
    );
};

export default CategoryListItem;
