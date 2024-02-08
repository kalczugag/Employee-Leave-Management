import { styled } from "@mui/material/styles";
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from "@mui/material/AccordionSummary";

export const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary {...props} />
))(({ theme }) => ({
    flexDirection: "row",
    alignItems: "center", // Center items vertically
    justifyContent: "space-between", // Distribute items evenly along the row
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
}));
