import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import DefaultPage from "../../../layout/DefaultPage";
import { FormView, FormField, FormEditor } from "../../../forms/FormView";

const EmployeeNew = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (values: any) => {
        // dispatch(addEmployee(values));
        console.log(values);
    };

    return (
        <DefaultPage label="New Employee" bg>
            <FormView onSubmit={handleSubmit}>
                <FormField
                    required
                    options={{ label: "Employee Name", name: "name" }}
                />
                <FormField
                    options={{
                        label: "Employee Short Name",
                        name: "shortName",
                    }}
                />
                <FormEditor
                    options={{ label: "Employee Details", name: "details" }}
                />
            </FormView>
        </DefaultPage>
    );
};

export default EmployeeNew;
