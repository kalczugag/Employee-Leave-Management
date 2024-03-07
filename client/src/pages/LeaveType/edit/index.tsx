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
                <FormField
                    options={{ label: "Leave Type Name", name: "name" }}
                />
                <FormEditor
                    options={{
                        label: "Leave Type Short Name",
                        name: "shortName",
                    }}
                />
                <FormCheckbox
                    options={{ label: "Leave Type Details", name: "details" }}
                />
            </FormView>
        </DefaultPage>
    );
};

export default LeaveTypeEdit;
