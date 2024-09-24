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

    const { data, isFetching } = useGetAllDepartmentsQuery();
    const [deleteDepartment, result] = useDeleteDepartmentMutation();

    const departmentdata = Array.isArray(data?.departments)
        ? data!.departments.map((row) => ({
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
                totalItems={data?.totalDepartmentsCount}
                isLoading={isFetching}
            />
        </DefaultPage>
    );
};

export default DepartmentList;
