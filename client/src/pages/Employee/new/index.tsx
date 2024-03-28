import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    RootState,
    AppDispatch,
    addEmployee,
    getDepartments,
} from "../../../store";
import useThunk from "../../../hooks/useThunk";
import useSnackbar from "../../../hooks/useSnackbar";
import DefaultPage from "../../../layout/DefaultPage";
import { FormView } from "../../../forms/FormView";
import UserForm from "../../../components/UserFormFields";

const EmployeeNew = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { handleOpen } = useSnackbar();

    const [doFetchDepartments, isFetchingDepartments] =
        useThunk(getDepartments);

    const departmentsData = useSelector(
        (state: RootState) => state.department.data
    );

    const departmentNames: string[] = departmentsData.map(
        (department) => department.name
    );

    useEffect(() => {
        if (departmentsData.length === 0 && !isFetchingDepartments) {
            doFetchDepartments(
                "shortName,details,status,createdAt,updatedAt,active,__v"
            );
        }
    }, []);

    const handleSubmit = (values: user) => {
        dispatch(addEmployee(values))
            .unwrap()
            .catch((err) => handleOpen(err.message, "error"))
            .finally(() => {
                navigate("../list");
                handleOpen("Department Create Successful");
            });
    };

    if (departmentsData.length === 0 && isFetchingDepartments) {
        return null;
    }

    return (
        <DefaultPage label="New Employee" bg>
            <FormView
                onSubmit={handleSubmit}
                initialValues={{ departments: departmentNames }}
            >
                <UserForm />
            </FormView>
        </DefaultPage>
    );
};

export default EmployeeNew;
