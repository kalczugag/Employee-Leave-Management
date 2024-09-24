import {
    useGetEmployeesQuery,
    useDeleteEmployeeMutation,
} from "../../../store";
import useAuth from "../../../hooks/useAuth";
import useSnackbar from "../../../hooks/useSnackbar";
import DefaultPage from "../../../layout/DefaultPage";
import BasicTable from "../../../components/Table";
import ActionButtons from "../../../components/ActionButtons";
import { fields } from "./config";
import { usePagination } from "../../../hooks/usePagination";

const EmployeeList = () => {
    const { handleOpen } = useSnackbar();
    const { user } = useAuth();
    const { page, pageSize } = usePagination();

    const { data, isFetching } = useGetEmployeesQuery({
        page,
        pageSize,
    });
    const [deleteEmployee, result] = useDeleteEmployeeMutation();

    const employeeData = Array.isArray(data?.users)
        ? data!.users.map((row) => ({
              ...row,
              isLoading: result.isLoading,
              userRole: user?.roles,
              handleDelete: () => handleDelete(row._id!),
          }))
        : [];

    const handleDelete = (id: string) => {
        deleteEmployee(id).then(() => {
            handleOpen("Employee Remove Successful");
        });
    };

    return (
        <DefaultPage label="Employee List" bg>
            <ActionButtons
                label="Add Employee"
                extended={user?.roles !== "staff"}
            />
            <BasicTable
                headerOptions={fields}
                rowData={employeeData}
                totalItems={data?.totalUsersCount}
                isLoading={isFetching}
            />
        </DefaultPage>
    );
};

export default EmployeeList;
