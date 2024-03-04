import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import useSnackbar from "../../hooks/useSnackbar";
import { Alert, Snackbar } from "@mui/material";

const SnackbarMsg = () => {
    const { handleClose } = useSnackbar();
    const { isOpen, message, severity, vertical, horizontal } = useSelector(
        (state: RootState) => state.snackbar
    );

    // useEffect(() => {
    //     const storedSnackbarState = JSON.parse(
    //         localStorage.getItem("snackbarState")
    //     );
    //     if (storedSnackbarState) {
    //         dispatch(
    //             openSnackbar(
    //                 storedSnackbarState.message,
    //                 storedSnackbarState.severity
    //             )
    //         );
    //         localStorage.removeItem("snackbarState");
    //     }
    // }, [dispatch]);

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={isOpen}
                autoHideDuration={3000}
                onClose={handleClose}
                key={vertical + horizontal}
            >
                <Alert
                    severity={severity}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default SnackbarMsg;
