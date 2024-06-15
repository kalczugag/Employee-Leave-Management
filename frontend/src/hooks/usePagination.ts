import { useSelector } from "react-redux";
import { RootState } from "../store";

export const usePagination = () => {
    const { page, pageSize } = useSelector((state: RootState) => state.table);

    return { page, pageSize };
};
