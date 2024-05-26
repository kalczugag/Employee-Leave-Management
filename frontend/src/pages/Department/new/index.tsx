import { useNavigate } from "react-router-dom";
import { useAddDepartmentMutation } from "../../../store";
import useSnackbar from "../../../hooks/useSnackbar";
import useAuth from "../../../hooks/useAuth";
import DefaultPage from "../../../layout/DefaultPage";
import { FormView, FormField, FormEditor } from "../../../forms/FormView";
import type { Department } from "@typ/department";

const DepartmentNew = () => {
    const navigate = useNavigate();
    const { handleOpen } = useSnackbar();
    const { user } = useAuth();

    const [addDepartment, result] = useAddDepartmentMutation();

    const handleSubmit = (values: Department) => {
        addDepartment(values).then(() => {
            navigate("../list");
            handleOpen("Department Create Successful");
        });
    };

    return (
        <DefaultPage label="Create Department" bg>
            <FormView
                onSubmit={handleSubmit}
                disabled={result.isLoading || user?.roles === "staff"}
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
