import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    AppDispatch,
    deleteDepartment,
    getDepartments,
    RootState,
    useGetAllDepartmentsQuery,
} from "../../../store";
import useThunk from "../../../hooks/useThunk";
import useSnackbar from "../../../hooks/useSnackbar";
import useAuth from "../../../hooks/useAuth";
import DefaultPage from "../../../layout/DefaultPage";
import ActionButtons from "../../../components/ActionButtons";
import BasicTable from "../../../components/Table";
import { fields } from "./config";

const DepartmentList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { handleOpen } = useSnackbar();
    const { user } = useAuth();

    const { data, isLoading, error } = useGetAllDepartmentsQuery();

    const departmentdata = useMemo(
        () =>
            data!.map((row) => ({
                ...row,
                isLoading,
                userRole: user?.roles,
                handleDelete: () => handleDelete(row._id!),
            })),
        [data]
    );

    if (!departmentdata) {
        return null;
    }

    const handleDelete = (id: string) => {
        dispatch(deleteDepartment(id))
            .then(() => {
                handleOpen("Department Remove Successful");
            })
            .catch((err) => handleOpen(err.message, "error"));
    };

    return (
        <DefaultPage label="Department List" bg>
            <ActionButtons
                label="Add Department"
                extended={
                    user?.roles.includes("hod") || user?.roles.includes("admin")
                }
            />
            <BasicTable headerOptions={fields} rowData={departmentdata} />
        </DefaultPage>
    );
};

export default DepartmentList;
