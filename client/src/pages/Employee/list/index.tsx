import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    AppDispatch,
    RootState,
    getEmployees,
    deleteEmployee,
} from "../../../store";
import useThunk from "../../../hooks/useThunk";
import useAuth from "../../../hooks/useAuth";
import useSnackbar from "../../../hooks/useSnackbar";
import DefaultPage from "../../../layout/DefaultPage";
import BasicTable from "../../../components/Table";
import ActionButtons from "../../../components/ActionButtons";
import { fields } from "./config";

const EmployeeList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { handleOpen } = useSnackbar();
    const { user } = useAuth();

    const [doFetchEmployees] = useThunk(getEmployees);

    const { data, isLoading, fulldata } = useSelector(
        (state: RootState) => state.employee
    );

    const employeeData = useMemo(
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
        if (employeeData.length <= 1 && !isLoading) {
            doFetchEmployees();
        } else if (!fulldata) {
            doFetchEmployees();
        }
    }, []);

    if (!employeeData && isLoading) {
        return null;
    }

    const handleDelete = (id: string) => {
        dispatch(deleteEmployee(id))
            .unwrap()
            .catch((err) => handleOpen(err.message, "error"))
            .finally(() => {
                handleOpen("Employee Remove Successful");
            });
    };

    return (
        <DefaultPage label="Employee List" bg>
            <ActionButtons
                label="Add Employee"
                extended={
                    user?.roles.includes("hod") || user?.roles.includes("admin")
                }
            />
            <BasicTable headerOptions={fields} rowData={employeeData} />
        </DefaultPage>
    );
};

export default EmployeeList;
