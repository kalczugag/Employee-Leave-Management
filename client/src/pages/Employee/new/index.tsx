import DefaultPage from "../../../layout/DefaultPage";
import { FormView, FormField, FormEditor } from "../../../forms/FormView";

const NewEmployee = () => {
    const handleSubmit = (values: any) => {
        console.log(values);
    };

    //test
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

export default NewEmployee;
