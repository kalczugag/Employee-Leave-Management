import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";

export const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    maxWidth: "225px",
    "&:not(:last-child)": {
        borderBottom: 0,
    },
    "&::before": {
        display: "none",
    },
}));
