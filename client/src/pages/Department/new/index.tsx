import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState, addDepartment } from "../../../store";
import useSnackbar from "../../../hooks/useSnackbar";
import DefaultPage from "../../../layout/DefaultPage";
import { FormView, FormField, FormEditor } from "../../../forms/FormView";

const DepartmentNew = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { handleOpen } = useSnackbar();

    const { isLoading } = useSelector((state: RootState) => state.department);

    const handleSubmit = (values: any) => {
        dispatch(addDepartment(values))
            .unwrap()
            .catch((err) => handleOpen(err))
            .finally(() => {
                navigate("../list");
                handleOpen("Department Create Successful");
            });
    };

    return (
        <DefaultPage label="Create Department" bg>
            <FormView onSubmit={handleSubmit}>
                <FormField
                    required
                    options={{ label: "Department Name", name: "name" }}
                    disabled={isLoading}
                />
                <FormField
                    options={{
                        label: "Department Short Name",
                        name: "shortName",
                    }}
                    disabled={isLoading}
                />
                <FormEditor
                    options={{ label: "Department Details", name: "details" }}
                    disabled={isLoading}
                />
            </FormView>
        </DefaultPage>
    );
};

export default DepartmentNew;
