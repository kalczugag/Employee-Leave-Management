import DefaultPage from "../../../layout/DefaultPage";
import { FormView, FormField, FormEditor } from "../../../forms/FormView";

const DepartmentNew = () => {
    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <DefaultPage label="Create Department" bg>
            <FormView onSubmit={handleSubmit}>
                <FormField required label="Department Name" />
                <FormField required label="Department Short Name" />
                <FormEditor label="Department Details" />
            </FormView>
        </DefaultPage>
    );
};

export default DepartmentNew;
