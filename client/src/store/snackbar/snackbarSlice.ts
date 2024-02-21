import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SnackbarOrigin } from "@mui/material";

interface SnackbarState extends SnackbarOrigin {
    isOpen: boolean;
    message: string;
}

const initialState: SnackbarState = {
    isOpen: true,
    vertical: "top",
    horizontal: "center",
    message: "",
};

const snackbarSlice = createSlice({
    name: "snackbar",
    initialState,
    reducers: {
        toggleSnackbar(state, action: PayloadAction<string>) {
            return {
                ...state,
                isOpen: true,
                message: action.payload,
            };
        },
        closeSnackbar(state) {
            return {
                ...state,
                isOpen: false,
                message: "",
            };
        },
    },
});

export const { toggleSnackbar, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
