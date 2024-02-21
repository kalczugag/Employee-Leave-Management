import { useDispatch } from "react-redux";
import { toggleSnackbar, closeSnackbar } from "../store";

const useSnackbar = () => {
    const dispatch = useDispatch();

    const showSnackbar = (msg: string) => {
        dispatch(toggleSnackbar(msg));
        setTimeout(() => {
            dispatch(closeSnackbar());
        }, 3000);
    };

    return showSnackbar;
};

export default useSnackbar;
