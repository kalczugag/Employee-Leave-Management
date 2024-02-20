import DefaultPage from "../../../layout/DefaultPage";
import { FormView, FormField, FormEditor } from "../../../forms/FormView";

const NewDepartment = () => {
    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <DefaultPage label="Create Department" bg>
            <FormView onSubmit={handleSubmit}>
                <FormField label="Department Name" />
                <FormField label="Department Short Name" />
                <FormEditor label="Department Details" />
            </FormView>
        </DefaultPage>
    );
};

export default NewDepartment;
