import { useFormState } from "react-final-form";
import {
    FormEditor,
    FormField,
    FormSelect,
    FormRadio,
} from "../../../forms/FormView";

interface Props {
    extended?: boolean;
    isLoading: boolean;
}

const LeaveFormFields = ({ extended, isLoading }: Props) => {
    const form = useFormState();

    return (
        <div className="grid grid-cols-2 gap-6">
            <FormSelect
                options={{ label: "Leave Type", name: "leaveType" }}
                values={form.initialValues.values}
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
                options={{ label: "Start Leave Date", name: "startDate" }}
                type="date"
                disabled={isLoading}
                required
            />
            <FormField
                options={{ label: "End Leave Date", name: "endDate" }}
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
            {extended && (
                <>
                    <FormRadio
                        options={{ label: "Status", name: "status" }}
                        values={["pending", "approved", "rejected"]}
                        disabled={isLoading}
                    />
                </>
            )}
        </div>
    );
};

export default LeaveFormFields;
