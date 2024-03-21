import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, addEmployee } from "../../../store";
import useSnackbar from "../../../hooks/useSnackbar";
import DefaultPage from "../../../layout/DefaultPage";
import { FormView } from "../../../forms/FormView";
import UserForm from "../../../components/UserForm";

const EmployeeNew = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { handleOpen } = useSnackbar();

    const handleSubmit = (values: user) => {
        dispatch(addEmployee(values))
            .unwrap()
            .catch((err) => handleOpen(err.message, "error"))
            .finally(() => {
                navigate("../list");
                handleOpen("Department Create Successful");
            });
    };

    return (
        <DefaultPage label="New Employee" bg>
            <FormView onSubmit={handleSubmit}>
                <UserForm />
            </FormView>
        </DefaultPage>
    );
};

export default EmployeeNew;
