import { useSelector } from "react-redux";
import { RootState } from "../store";
import { userApi } from "../store/apis/userApi";

const useAuth = () => {
    const { data, isLoading } = useSelector((state: RootState) =>
        userApi.endpoints.fetchUser.select()(state)
    );

    return { user: data, isAuthenticated: true, isLoading };
};

export default useAuth;
