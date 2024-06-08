import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { departmentApi } from "./apis/departmentApi";
import { leaveTypeApi } from "./apis/leaveTypeApi";
import { employeeApi } from "./apis/employeeApi";
import { leaveApi } from "./apis/leaveApi";
import userReducer from "./user/userSlice";
import sidebarReducer from "./sidebar/sidebarSlice";
import tableReducer from "./table/tableSlice";
import snackbarReducer from "./snackbar/snackbarSlice";
import editorReducer from "./editor/editorSlice";

export const store = configureStore({
    reducer: {
        [departmentApi.reducerPath]: departmentApi.reducer,
        [leaveTypeApi.reducerPath]: leaveTypeApi.reducer,
        [employeeApi.reducerPath]: employeeApi.reducer,
        [leaveApi.reducerPath]: leaveApi.reducer,
        user: userReducer,
        sidebar: sidebarReducer,
        table: tableReducer,
        snackbar: snackbarReducer,
        editor: editorReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(departmentApi.middleware)
            .concat(leaveTypeApi.middleware)
            .concat(employeeApi.middleware)
            .concat(leaveApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./user/userSlice";
export * from "./sidebar/sidebarSlice";
export * from "./table/tableSlice";
export * from "./snackbar/snackbarSlice";
export * from "./editor/editorSlice";
export {
    useGetAllDepartmentsQuery,
    useGetDepartmentQuery,
    useAddDepartmentMutation,
    useDeleteDepartmentMutation,
    useEditDepartmentMutation,
} from "./apis/departmentApi";
export {
    useGetLeaveTypesQuery,
    useGetLeaveTypeQuery,
    useAddLeaveTypeMutation,
    useEditLeaveTypeMutation,
    useDeleteLeaveTypeMutation,
} from "./apis/leaveTypeApi";
export {
    useGetEmployeesQuery,
    useGetEmployeeQuery,
    useGetEmployeesByIdsQuery,
    useAddEmployeeMutation,
    useEditEmployeeMutation,
    useDeleteEmployeeMutation,
} from "./apis/employeeApi";
export {
    useGetLeavesQuery,
    useGetLeaveQuery,
    useAddLeaveMutation,
    useEditLeaveMutation,
    useDeleteLeaveMutation,
} from "./apis/leaveApi";
