import { useSelector } from "react-redux";
import { useFormState } from "react-final-form";
import { RootState } from "../../store";
import { FormEditor, FormField, FormSelect } from "../../forms/FormView";

const LeaveFormFields = () => {
    const form = useFormState();

    const { isLoading } = useSelector((state: RootState) => state.leave);

    return (
        <div className="grid grid-cols-2 gap-6">
            <FormSelect
                options={{ label: "Leave Type", name: "leaveType" }}
                values={form.initialValues.departments}
                disabled={isLoading}
                required
            />
            <FormField
                options={{ label: "Num Of Day", name: "totalDay" }}
                type="number"
                disabled={isLoading}
                required
            />
            <FormField
                options={{ label: "Start Leave Date", name: "startLeaveDate" }}
                type="date"
                disabled={isLoading}
                required
            />
            <FormField
                options={{ label: "End Leave Date", name: "endLeaveDate" }}
                type="date"
                disabled={isLoading}
                required
            />
            <div className="col-span-2">
                <FormEditor
                    options={{ label: "Leave Details", name: "details" }}
                    disabled={isLoading}
                />
            </div>
        </div>
    );
};

export default LeaveFormFields;
