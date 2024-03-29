import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    AppDispatch,
    RootState,
    getEmployees,
    deleteEmployee,
} from "../../../store";
import useThunk from "../../../hooks/useThunk";
import useSnackbar from "../../../hooks/useSnackbar";
import ListSearchForm from "../../../forms/SearchForm";
import DefaultPage from "../../../layout/DefaultPage";
import BasicTable from "../../../components/Table";
import ActionButtons from "../../../components/ActionButtons";
import { fields } from "./config";

const EmployeeList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { handleOpen } = useSnackbar();

    const [doFetchEmployees] = useThunk(getEmployees);

    const { data, isLoading, fulldata } = useSelector(
        (state: RootState) => state.employee
    );

    const employeeData = useMemo(
        () =>
            data.map((row) => ({
                ...row,
                isLoading,
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
        console.log(id);
        dispatch(deleteEmployee(id))
            .unwrap()
            .catch((err) => handleOpen(err.message, "error"))
            .finally(() => {
                handleOpen("Employee Remove Successful");
            });
    };

    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <DefaultPage label="Employee List" bg>
            <ActionButtons label="Add Employee" />
            <ListSearchForm onSubmit={handleSubmit} />
            <BasicTable headerOptions={fields} rowData={employeeData} />
        </DefaultPage>
    );
};

export default EmployeeList;
