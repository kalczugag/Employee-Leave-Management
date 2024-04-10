import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    AppDispatch,
    deleteDepartment,
    getDepartments,
    RootState,
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

    const [doFetchDepartments, isFetching] = useThunk(getDepartments);

    const { data, isLoading, fullData } = useSelector(
        (state: RootState) => state.department
    );

    const departmentdata = useMemo(
        () =>
            data.map((row) => ({
                ...row,
                isLoading,
                userRole: user?.roles,
                handleDelete: () => handleDelete(row._id!),
            })),
        [data]
    );

    useEffect(() => {
        if (departmentdata.length <= 1 && !isFetching) {
            doFetchDepartments();
        } else if (!fullData) {
            doFetchDepartments();
        }
    }, []);

    if (!departmentdata && isFetching) {
        return null;
    }

    const handleDelete = (id: string) => {
        dispatch(deleteDepartment(id))
            .unwrap()
            .catch((err) => handleOpen(err.message, "error"))
            .finally(() => {
                handleOpen("Department Remove Successful");
            });
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
