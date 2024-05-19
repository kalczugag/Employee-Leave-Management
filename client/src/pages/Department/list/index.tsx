import { useMemo } from "react";
import {
    useDeleteDepartmentMutation,
    useGetAllDepartmentsQuery,
} from "../../../store";
import useSnackbar from "../../../hooks/useSnackbar";
import useAuth from "../../../hooks/useAuth";
import DefaultPage from "../../../layout/DefaultPage";
import ActionButtons from "../../../components/ActionButtons";
import BasicTable from "../../../components/Table";
import { fields } from "./config";

const DepartmentList = () => {
    const { handleOpen } = useSnackbar();
    const { user } = useAuth();

    const { data, isLoading, error } = useGetAllDepartmentsQuery();
    const [deleteDepartment, result] = useDeleteDepartmentMutation();

    if (!data) {
        return null;
    }

    const departmentdata = data.map((row) => ({
        ...row,
        isLoading,
        userRole: user?.roles,
        handleDelete: () => handleDelete(row._id!),
    }));

    const handleDelete = (id: string) => {
        deleteDepartment(id);
        // dispatch(deleteDepartment(id))
        //     .then(() => {
        //         handleOpen("Department Remove Successful");
        //     })
        //     .catch((err) => handleOpen(err.message, "error"));
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
