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

    const { data, isLoading, isFetching } = useGetAllDepartmentsQuery();
    const [deleteDepartment, result] = useDeleteDepartmentMutation();

    if (!data && !isLoading) {
        return null;
    }

    const departmentdata = Array.isArray(data)
        ? data.map((row) => ({
              ...row,
              isLoading: result.isLoading,
              userRole: user?.roles,
              handleDelete: () => handleDelete(row._id!),
          }))
        : [];

    const handleDelete = (id: string) => {
        deleteDepartment(id).then(() => {
            handleOpen("Department Remove Successful");
        });
    };

    return (
        <DefaultPage label="Department List" bg>
            <ActionButtons
                label="Add Department"
                extended={user?.roles !== "staff"}
            />
            <BasicTable
                headerOptions={fields}
                rowData={departmentdata}
                isLoading={isFetching}
            />
        </DefaultPage>
    );
};

export default DepartmentList;
