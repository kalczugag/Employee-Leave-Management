import { useSelector } from "react-redux";
import { RootState } from "../store";

const useAuth = () => {
    const { data, isAuthenticated } = useSelector(
        (state: RootState) => state.user
    );

    return { user: data, isAuthenticated };
};

export default useAuth;
