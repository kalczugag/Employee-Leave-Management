import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./apis/userApi";
import sidebarReducer from "./sidebar/sidebarSlice";
import snackbarReducer from "./snackbar/snackbarSlice";
import departmentReducer from "./department/departmentSlice";
import leaveTypeReducer from "./leaveType/leaveTypeSlice";
import leaveReducer from "./leave/leaveSlice";
import employeeSlice from "./employee/employeeSlice";
import editorReducer from "./editor/editorSlice";

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        sidebar: sidebarReducer,
        snackbar: snackbarReducer,
        department: departmentReducer,
        leaveType: leaveTypeReducer,
        leave: leaveReducer,
        employee: employeeSlice,
        editor: editorReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(userApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./user/userSlice";
export * from "./sidebar/sidebarSlice";
export * from "./snackbar/snackbarSlice";
export * from "./department/departmentSlice";
export * from "./leaveType/leaveTypeSlice";
export * from "./leave/leaveSlice";
export * from "./employee/employeeSlice";
export * from "./editor/editorSlice";
export {
    useFetchUserQuery,
    useLoginMutation,
    useRegisterMutation,
} from "./apis/userApi";
