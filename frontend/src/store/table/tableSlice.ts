import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TableState {
    page: number;
    pageSize: number;
}

const initialState: TableState = {
    page: 0,
    pageSize: 5,
};

const tableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setPageSize(state, action: PayloadAction<number>) {
            state.pageSize = action.payload;
        },
    },
});

export const { setPage, setPageSize } = tableSlice.actions;

export default tableSlice.reducer;
