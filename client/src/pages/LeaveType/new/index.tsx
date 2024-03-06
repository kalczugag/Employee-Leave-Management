import DefaultPage from "../../../layout/DefaultPage";
import { FormView, FormField, FormEditor } from "../../../forms/FormView";

const LeaveTypeNew = () => {
    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <DefaultPage label="Create Leave Type" bg>
            <FormView onSubmit={handleSubmit}>
                <FormField required label="Leave Type Name" />
                <FormField required label="Leave Type Short Name" />
                <FormEditor label="Leave Type Details" />
            </FormView>
        </DefaultPage>
    );
};

export default LeaveTypeNew;
