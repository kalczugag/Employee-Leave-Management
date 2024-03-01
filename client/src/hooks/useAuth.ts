import { useSelector } from "react-redux";
import { RootState } from "../store";

const useAuth = () => {
    const user = useSelector((state: RootState) => state.user);

    return user;
};

export default useAuth;
