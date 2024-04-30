import { useSelector, useDispatch } from "react-redux";
import { setPage, setRowsPerPage, RootState } from "../store";

type SliceNames = keyof RootState;

const usePageAndRows = (option?: SliceNames) => {
    const dispatch = useDispatch();
    const { page, rowsPerPage } = useSelector(
        (state: RootState) => state["leave"]
    );

    const changePage = (page: number) => {
        if (page < 0) return;

        dispatch(setPage(page));
    };

    const changeRowsPerPage = (rows: number) => {
        if (rows < 0) return;

        dispatch(setRowsPerPage(rows));
    };

    return { page, rowsPerPage, changePage, changeRowsPerPage };
};

export default usePageAndRows;
