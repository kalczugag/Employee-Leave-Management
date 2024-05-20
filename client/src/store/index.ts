import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { departmentApi } from "./apis/departmentApi";
import { leaveTypeApi } from "./apis/leaveTypeApi";
import { employeeApi } from "./apis/employeeApi";
import userReducer from "./user/userSlice";
import sidebarReducer from "./sidebar/sidebarSlice";
import snackbarReducer from "./snackbar/snackbarSlice";
import leaveReducer from "./leave/leaveSlice";
import editorReducer from "./editor/editorSlice";

export const store = configureStore({
    reducer: {
        [departmentApi.reducerPath]: departmentApi.reducer,
        [leaveTypeApi.reducerPath]: leaveTypeApi.reducer,
        [employeeApi.reducerPath]: employeeApi.reducer,
        user: userReducer,
        sidebar: sidebarReducer,
        snackbar: snackbarReducer,
        leave: leaveReducer,
        editor: editorReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(departmentApi.middleware)
            .concat(leaveTypeApi.middleware)
            .concat(employeeApi.middleware),
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
    useAddEmployeeMutation,
    useEditEmployeeMutation,
    useDeleteEmployeeMutation,
} from "./apis/employeeApi";
