import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import sidebarReducer from "./sidebar/sidebarSlice";
import snackbarReducer from "./snackbar/snackbarSlice";
import departmentReducer from "./department/departmentSlice";
import leaveTypeReducer from "./leaveType/leaveTypeSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        sidebar: sidebarReducer,
        snackbar: snackbarReducer,
        department: departmentReducer,
        leaveType: leaveTypeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./user/userSlice";
export * from "./sidebar/sidebarSlice";
export * from "./snackbar/snackbarSlice";
export * from "./department/departmentSlice";
export * from "./leaveType/leaveTypeSlice";
