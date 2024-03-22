import { FormEditor, FormField, FormSelect } from "../../forms/FormView";

const LeaveForm = () => {
    return (
        <div className="grid grid-cols-2 gap-6">
            <FormSelect
                options={{ label: "Leave Type", name: "leaveType" }}
                values={["x"]}
                required
            />
            <FormField
                options={{ label: "Num Of Day", name: "totalDay" }}
                type="number"
                required
            />
            <FormField
                options={{ label: "Start Leave Date", name: "startLeaveDate" }}
                type="date"
                required
            />
            <FormField
                options={{ label: "End Leave Date", name: "endLeaveDate" }}
                type="date"
                required
            />
            <div className="col-span-2">
                <FormEditor
                    options={{ label: "Leave Details", name: "details" }}
                />
            </div>
        </div>
    );
};

export default LeaveForm;
