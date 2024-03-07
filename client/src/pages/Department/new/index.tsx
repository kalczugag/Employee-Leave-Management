import { useDispatch } from "react-redux";
import { AppDispatch, addDepartment } from "../../../store";
import DefaultPage from "../../../layout/DefaultPage";
import { FormView, FormField, FormEditor } from "../../../forms/FormView";

const DepartmentNew = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (values: any) => {
        dispatch(addDepartment(values));
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
