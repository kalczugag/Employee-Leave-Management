import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    AppDispatch,
    RootState,
    editEmployee,
    getEmployee,
    getDepartments,
} from "../../../store";
import useThunk from "../../../hooks/useThunk";
import useSnackbar from "../../../hooks/useSnackbar";
import DefaultPage from "../../../layout/DefaultPage";
import { FormView } from "../../../forms/FormView";
import UserForFields from "../../../components/UserFormFields";

const EmployeeEdit = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { handleOpen } = useSnackbar();

    const [doFetchEmployee, isFetchingEmployee] = useThunk(getEmployee);
    const [doFetchDepartments, isFetchingDepartments] =
        useThunk(getDepartments);

    const employeeData = useSelector((state: RootState) =>
        state.employee.data.find((value) => value._id === id)
    );
    const departmentsData = useSelector(
        (state: RootState) => state.department.data
    );

    const departmentNames: string[] = departmentsData.map(
        (department) => department.name
    );

    useEffect(() => {
        const selectQuery = "shortName,details,status,createdAt,updatedAt,__v";

        if (
            !employeeData &&
            departmentsData.length === 0 &&
            !isFetchingDepartments &&
            !isFetchingEmployee
        ) {
            doFetchEmployee({ id });
            doFetchDepartments(selectQuery);
        } else if (!employeeData && !isFetchingEmployee) {
            doFetchEmployee({ id });
        } else if (departmentsData.length === 0 && !isFetchingDepartments) {
            doFetchDepartments(selectQuery);
        }
    }, []);

    if (!employeeData && departmentsData.length === 0) {
        return null;
    }

    const handleSubmit = (values: user) => {
        if (!employeeData || !values) {
            return;
        }

        let hasChanged = false;

        for (const key in values) {
            if (values[key as keyof user] !== employeeData[key as keyof user]) {
                hasChanged = true;
                break;
            }
        }

        if (hasChanged) {
            dispatch(editEmployee(values))
                .unwrap()
                .catch((err) => {
                    handleOpen(err.message, "error");
                })
                .finally(() => {
                    navigate("../list");
                    handleOpen("Employee Update Successful");
                });
        } else {
            handleOpen("No changes detected", "error");
        }
    };

    if (!employeeData || departmentNames.length === 0) {
        return null;
    }

    return (
        <DefaultPage label="Edit Employee" bg>
            <FormView
                initialValues={{
                    ...employeeData,
                    departments: departmentNames,
                }}
                onSubmit={handleSubmit}
            >
                <UserForFields />
            </FormView>
        </DefaultPage>
    );
};

export default EmployeeEdit;
