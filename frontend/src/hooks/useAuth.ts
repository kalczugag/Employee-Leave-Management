import { useSelector } from "react-redux";
import { RootState } from "../store";

const useAuth = () => {
    const { data, isAuthenticated, isLoading } = useSelector(
        (state: RootState) => state.user
    );

    return { user: data, isAuthenticated, isLoading };
};

export default useAuth;
