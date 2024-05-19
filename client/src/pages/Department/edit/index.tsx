import { useNavigate, useParams } from "react-router-dom";
import {
    useEditDepartmentMutation,
    useGetDepartmentQuery,
} from "../../../store";
import useSnackbar from "../../../hooks/useSnackbar";
import useAuth from "../../../hooks/useAuth";
import DefaultPage from "../../../layout/DefaultPage";
import {
    FormView,
    FormField,
    FormEditor,
    FormCheckbox,
} from "../../../forms/FormView";
import type { Department } from "@typ/department";

const DepartmentEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { handleOpen } = useSnackbar();
    const { user } = useAuth();

    const { data, isLoading } = useGetDepartmentQuery(id || "");
    const [editDepartment, result] = useEditDepartmentMutation();

    if (!data) {
        return null;
    }

    const handleSubmit = (values: Department) => {
        editDepartment(values);

        // dispatch(editDepartment(values))
        //     .then(() => {
        //         navigate("../list");
        //         handleOpen("Department Update Successful");
        //     })
        //     .catch((err) => handleOpen(err.message, "error"));
    };

    const disabled =
        (result.isLoading && !user?.roles.includes("hod")) ||
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
