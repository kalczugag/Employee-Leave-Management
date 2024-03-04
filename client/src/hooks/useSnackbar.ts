import { useDispatch } from "react-redux";
import { toggleSnackbar, closeSnackbar } from "../store";

function useSnackbar() {
    const dispatch = useDispatch();

    const handleOpen = (message: string, severity?: "success" | "error") => {
        dispatch(toggleSnackbar({ message, severity }));
        localStorage.setItem(
            "snackbarState",
            JSON.stringify({ message, severity })
        );
    };

    const handleClose = () => {
        dispatch(closeSnackbar());
    };

    return { handleOpen, handleClose };
}

export default useSnackbar;
