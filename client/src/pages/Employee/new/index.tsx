import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    AppDispatch,
    addEmployee,
    useGetAllDepartmentsQuery,
} from "../../../store";
import useSnackbar from "../../../hooks/useSnackbar";
import useAuth from "../../../hooks/useAuth";
import DefaultPage from "../../../layout/DefaultPage";
import { FormView } from "../../../forms/FormView";
import UserForm from "../../../containers/Forms/UserFormFields";

const EmployeeNew = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { handleOpen } = useSnackbar();
    const { user } = useAuth();

    const { data, isFetching } = useGetAllDepartmentsQuery(
        "shortName,details,status,createdAt,updatedAt,active,__v"
    );

    if (!data) {
        return null;
    }

    const departmentNames: string[] = data.map((department) => department.name);

    const handleSubmit = (values: user) => {
        dispatch(addEmployee(values))
            .then(() => {
                navigate("../list");
                handleOpen("Department Create Successful");
            })
            .catch((err) => handleOpen(err.message, "error"));
    };

    return (
        <DefaultPage label="New Employee" bg>
            <FormView
                onSubmit={handleSubmit}
                initialValues={{ values: departmentNames }}
                disabled={
                    isFetching ||
                    !user?.roles.includes("hod") ||
                    !user?.roles.includes("admin")
                }
            >
                <UserForm />
            </FormView>
        </DefaultPage>
    );
};

export default EmployeeNew;
