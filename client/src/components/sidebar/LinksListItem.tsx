import "../../assets/styles/sidebar.css";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { createTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

type Props = {
    label: string;
    to?: string;
    element: JSX.Element;
    expanded: string | false;
    handleChange: (
        panel: string
    ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
};

const LinksListItem = ({
    label,
    to,
    element,
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
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            elevation={0}
            style={{
                border: "none",
                margin: 0,
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Typography>
                    {label.charAt(0).toUpperCase() + label.slice(1)}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>{/* nested links */}</Typography>
            </AccordionDetails>
        </Accordion>
    );
};

export default LinksListItem;
