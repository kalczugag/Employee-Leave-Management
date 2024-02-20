import {
    FormView,
    FormField,
    FormEditor,
    FormCheckbox,
} from "../../../forms/FormView";
import DefaultPage from "../../../layout/DefaultPage";

const LeaveTypeUpdate = () => {
    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <DefaultPage label="Update Leave Type" bg>
            <FormView onSubmit={handleSubmit}>
                <FormField label="LeaveType Name" />
                <FormEditor label="LeaveType Details" />
                <FormCheckbox label="LeaveType Status" />
            </FormView>
        </DefaultPage>
    );
};

export default LeaveTypeUpdate;
