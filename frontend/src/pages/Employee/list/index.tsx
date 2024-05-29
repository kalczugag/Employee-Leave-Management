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

const EmployeeList = () => {
    const { handleOpen } = useSnackbar();
    const { user } = useAuth();

    const { data, isLoading, isFetching } = useGetEmployeesQuery();
    const [deleteEmployee, result] = useDeleteEmployeeMutation();

    if (!data && !isLoading) {
        return null;
    }

    const employeeData = Array.isArray(data)
        ? data.map((row) => ({
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
                isLoading={isFetching}
            />
        </DefaultPage>
    );
};

export default EmployeeList;
