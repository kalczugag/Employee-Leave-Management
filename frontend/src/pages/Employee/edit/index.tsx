import { useNavigate, useParams } from "react-router-dom";
import { useEditEmployeeMutation, useGetEmployeeQuery } from "../../../store";
import useSnackbar from "../../../hooks/useSnackbar";
import { useNamesListDepartment } from "../../../hooks/useNamesList";
import useAuth from "../../../hooks/useAuth";
import DefaultPage from "../../../layout/DefaultPage";
import { FormView } from "../../../forms/FormView";
import UserFormFields from "../../../containers/Forms/UserFormFields";
import NotFound from "@components/NotFound";
import LoadingBackdrop from "@components/LoadingBackdrop";

const EmployeeEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { handleOpen } = useSnackbar();
    const namesList = useNamesListDepartment();
    const { user } = useAuth();

    const { data, isLoading, isSuccess } = useGetEmployeeQuery({ id: id! });
    const [editEmployee, result] = useEditEmployeeMutation();

    if (isLoading) {
        return <LoadingBackdrop isLoading={isLoading} />;
    }

    if (!data || !isSuccess) {
        return <NotFound />;
    }

    const handleSubmit = (values: user) => {
        editEmployee(values).then(() => {
            navigate("../list");
            handleOpen("Employee Update Successful");
        });
    };

    const disabled = result.isLoading || user?.roles === "staff";

    return (
        <DefaultPage label="Edit Employee" bg>
            <FormView
                initialValues={{
                    ...data,
                    values: namesList,
                }}
                disabled={disabled}
                onSubmit={handleSubmit}
            >
                <UserFormFields isLoading={result.isLoading} />
            </FormView>
        </DefaultPage>
    );
};

export default EmployeeEdit;
