import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Snackbar, SnackbarContent } from "@mui/material";

const SnackbarStatus = () => {
    const { isOpen, message, vertical, horizontal } = useSelector(
        (state: RootState) => state.snackbar
    );

    //render twice
    return (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={isOpen}
            key={vertical + horizontal}
        >
            <SnackbarContent sx={{ bgcolor: "teal" }} message={message} />
        </Snackbar>
    );
};

export default SnackbarStatus;
