import { addDepartment } from "../../../store";
import useThunk from "../../../hooks/useThunk";
import DefaultPage from "../../../layout/DefaultPage";
import { FormView, FormField, FormEditor } from "../../../forms/FormView";

const DepartmentNew = () => {
    const [doAddDepartment] = useThunk(addDepartment);

    const handleSubmit = (values: any) => {
        doAddDepartment(values);
        console.log(values);
    };

    return (
        <DefaultPage label="Create Department" bg>
            <FormView onSubmit={handleSubmit}>
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
