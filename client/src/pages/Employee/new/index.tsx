import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    AppDispatch,
    useAddEmployeeMutation,
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
    const [addEmployee] = useAddEmployeeMutation();

    if (!data) {
        return null;
    }

    const departmentNames: string[] = data.map((department) => department.name);

    const handleSubmit = (values: user) => {
        addEmployee(values).then(() => {
            navigate("../list");
            handleOpen("Department Create Successful");
        });
    };

    return (
        <DefaultPage label="New Employee" bg>
            <FormView
                onSubmit={handleSubmit}
                initialValues={{ values: departmentNames }}
                disabled={isFetching || user?.roles === "staff"}
            >
                <UserForm isLoading={isFetching} />
            </FormView>
        </DefaultPage>
    );
};

export default EmployeeNew;
