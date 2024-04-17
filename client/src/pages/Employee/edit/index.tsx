import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    AppDispatch,
    RootState,
    editEmployee,
    getEmployee,
} from "../../../store";
import useThunk from "../../../hooks/useThunk";
import useSnackbar from "../../../hooks/useSnackbar";
import useNamesList from "../../../hooks/useNamesList";
import useAuth from "../../../hooks/useAuth";
import DefaultPage from "../../../layout/DefaultPage";
import { FormView } from "../../../forms/FormView";
import UserFormFields from "../../../components/UserFormFields";

const EmployeeEdit = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { handleOpen } = useSnackbar();
    const { namesList } = useNamesList("department");
    const { user } = useAuth();

    const [doFetchEmployee, isFetchingEmployee] = useThunk(getEmployee);

    const employeeData = useSelector((state: RootState) =>
        state.employee.data.find((value) => value._id === id)
    );

    useEffect(() => {
        if (!employeeData && !isFetchingEmployee) {
            doFetchEmployee({ id });
        }
    }, []);

    if (!employeeData && namesList.length === 0) {
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

    if (!employeeData || namesList.length === 0) {
        return null;
    }

    const disabled =
        (isFetchingEmployee && !user?.roles.includes("hod")) ||
        !user?.roles.includes("admin");

    return (
        <DefaultPage label="Edit Employee" bg>
            <FormView
                initialValues={{
                    ...employeeData,
                    values: namesList,
                }}
                disabled={disabled}
                onSubmit={handleSubmit}
            >
                <UserFormFields />
            </FormView>
        </DefaultPage>
    );
};

export default EmployeeEdit;
