import DefaultPage from "../../../layout/DefaultPage";
import { FormView, FormField, FormEditor } from "../../../forms/FormView";

const EmployeeNew = () => {
    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <DefaultPage label="New Employee" bg>
            <FormView onSubmit={handleSubmit}>
                <FormField label="Employee Name" />
                <FormField label="Employee Short Name" />
                <FormEditor label="Employee Details" />
            </FormView>
        </DefaultPage>
    );
};

export default EmployeeNew;
