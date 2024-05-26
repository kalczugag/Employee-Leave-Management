import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SnackbarOrigin } from "@mui/material";

interface SnackbarState extends SnackbarOrigin {
    isOpen: boolean;
    message: string;
    severity: "success" | "error";
}

export interface ToggleSnackbarPayload {
    message: string;
    severity?: "success" | "error";
}

const initialState: SnackbarState = {
    isOpen: false,
    message: "",
    severity: "success",
    vertical: "top",
    horizontal: "center",
};

const snackbarSlice = createSlice({
    name: "snackbar",
    initialState,
    reducers: {
        toggleSnackbar(state, action: PayloadAction<ToggleSnackbarPayload>) {
            const { message, severity = "success" } = action.payload;

            return {
                ...state,
                isOpen: true,
                message,
                severity,
            };
        },
        closeSnackbar(state) {
            return {
                ...state,
                isOpen: false,
            };
        },
    },
});

export const { toggleSnackbar, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
