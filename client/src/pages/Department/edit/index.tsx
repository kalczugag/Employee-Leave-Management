import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    AppDispatch,
    RootState,
    editDepartment,
    getDepartment,
} from "../../../store";
import useThunk from "../../../hooks/useThunk";
import useSnackbar from "../../../hooks/useSnackbar";
import useAuth from "../../../hooks/useAuth";
import DefaultPage from "../../../layout/DefaultPage";
import {
    FormView,
    FormField,
    FormEditor,
    FormCheckbox,
} from "../../../forms/FormView";

const DepartmentEdit = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { handleOpen } = useSnackbar();
    const { user } = useAuth();

    const [doFetchDepartment] = useThunk(getDepartment);

    const { isLoading } = useSelector((state: RootState) => state.department);
    const data = useSelector((state: RootState) =>
        state.department.data.find((value) => value._id === id)
    );

    useEffect(() => {
        if (!data && !isLoading) {
            doFetchDepartment(id);
        }
    }, []);

    const handleSubmit = (values: any) => {
        dispatch(editDepartment(values))
            .then(() => {
                navigate("../list");
                handleOpen("Department Update Successful");
            })
            .catch((err) => handleOpen(err.message, "error"));
    };

    const disabled =
        (isLoading && !user?.roles.includes("hod")) ||
        !user?.roles.includes("admin");

    return (
        <DefaultPage label="Edit Department" bg>
            <FormView
                onSubmit={handleSubmit}
                initialValues={data}
                disabled={disabled}
            >
                <FormField
                    required
                    options={{ label: "Department Name", name: "name" }}
                />
                <FormField
                    options={{
                        label: "Department Short Name",
                        name: "shortName",
                    }}
                />
                <FormEditor
                    options={{ label: "Department Details", name: "details" }}
                />
                <FormCheckbox
                    options={{ label: "Department Status", name: "active" }}
                />
            </FormView>
        </DefaultPage>
    );
};

export default DepartmentEdit;
