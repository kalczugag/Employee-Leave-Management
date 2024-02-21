import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebar/sidebarSlice";
import snackbarReducer from "./snackbar/snackbarSlice";

export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        snackbar: snackbarReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./sidebar/sidebarSlice";
export * from "./snackbar/snackbarSlice";
