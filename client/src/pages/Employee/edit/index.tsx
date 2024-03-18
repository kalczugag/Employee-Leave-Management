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
import DefaultPage from "../../../layout/DefaultPage";
import { FormView } from "../../../forms/FormView";
import UserForm from "../../../components/UserForm";

const EmployeeEdit = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { handleOpen } = useSnackbar();

    const [doFetchEmployee, isFetching] = useThunk(getEmployee);

    const data = useSelector((state: RootState) =>
        state.employee.data.find((value) => value._id === id)
    );

    useEffect(() => {
        if (!data && !isFetching) {
            doFetchEmployee(id);
        }
    }, []);

    const handleSubmit = (values: user) => {
        dispatch(editEmployee(values))
            .unwrap()
            .catch((err) => {
                handleOpen(err.message, "error");
            })
            .finally(() => {
                navigate("../list");
                handleOpen("Employee Update Successful");
            });
    };

    return (
        <DefaultPage label="Edit Employee" bg>
            <FormView initialValues={data} onSubmit={handleSubmit}>
                <UserForm />
            </FormView>
        </DefaultPage>
    );
};

export default EmployeeEdit;
