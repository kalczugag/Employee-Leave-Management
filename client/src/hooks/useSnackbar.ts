import { useDispatch } from "react-redux";
import { toggleSnackbar, closeSnackbar } from "../store";

function useSnackbar() {
    const dispatch = useDispatch();

    const handleClick = (msg: string) => {
        dispatch(toggleSnackbar({ message: msg }));
    };

    const handleClose = () => {
        dispatch(closeSnackbar());
    };

    return { handleClick, handleClose };
}

export default useSnackbar;
