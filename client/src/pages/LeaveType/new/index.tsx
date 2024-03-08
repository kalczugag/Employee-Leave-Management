import { addLeaveType } from "../../../store";
import DefaultPage from "../../../layout/DefaultPage";
import { FormView, FormField, FormEditor } from "../../../forms/FormView";
import useThunk from "../../../hooks/useThunk";

const LeaveTypeNew = () => {
    const [doAddLeaveType] = useThunk(addLeaveType);

    const handleSubmit = (values: any) => {
        doAddLeaveType(values);
    };

    return (
        <DefaultPage label="Create Leave Type" bg>
            <FormView onSubmit={handleSubmit}>
                <FormField
                    required
                    options={{ label: "Leave Type Name", name: "name" }}
                />
                <FormField
                    options={{
                        label: "Leave Type Short Name",
                        name: "shortName",
                    }}
                />
                <FormEditor
                    options={{ label: "Leave Type Details", name: "details" }}
                />
            </FormView>
        </DefaultPage>
    );
};

export default LeaveTypeNew;
