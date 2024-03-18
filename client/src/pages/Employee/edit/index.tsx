import DefaultPage from "../../../layout/DefaultPage";
import { FormView } from "../../../forms/FormView";

const EmployeeEdit = () => {
    const handleSubmit = (values: user) => {
        console.log(values);
    };

    return (
        <DefaultPage label="Edit Employee">
            <FormView onSubmit={handleSubmit}>x</FormView>
        </DefaultPage>
    );
};

export default EmployeeEdit;
