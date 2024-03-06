import {
    FormView,
    FormField,
    FormEditor,
    FormCheckbox,
} from "../../../forms/FormView";
import DefaultPage from "../../../layout/DefaultPage";

const LeaveTypeEdit = () => {
    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <DefaultPage label="Edit Leave Type" bg>
            <FormView onSubmit={handleSubmit}>
                <FormField label="Leave Type Name" />
                <FormEditor label="Leave Type Details" />
                <FormCheckbox label="Leave Type Status" />
            </FormView>
        </DefaultPage>
    );
};

export default LeaveTypeEdit;
