import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState, addDepartment } from "../../../store";
import useSnackbar from "../../../hooks/useSnackbar";
import useAuth from "../../../hooks/useAuth";
import DefaultPage from "../../../layout/DefaultPage";
import { FormView, FormField, FormEditor } from "../../../forms/FormView";

const DepartmentNew = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { handleOpen } = useSnackbar();
    const { user } = useAuth();

    const { isLoading } = useSelector((state: RootState) => state.department);

    const handleSubmit = (values: any) => {
        dispatch(addDepartment(values))
            .unwrap()
            .catch((err) => handleOpen(err.message, "error"))
            .finally(() => {
                navigate("../list");
                handleOpen("Department Create Successful");
            });
    };

    return (
        <DefaultPage label="Create Department" bg>
            <FormView
                onSubmit={handleSubmit}
                disabled={
                    isLoading ||
                    !user?.roles.includes("hod") ||
                    !user?.roles.includes("admin")
                }
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
            </FormView>
        </DefaultPage>
    );
};

export default DepartmentNew;
