import { useSelector } from "react-redux";
import { useFormState } from "react-final-form";
import { RootState } from "../../store";
import {
    FormEditor,
    FormField,
    FormSelect,
    FormRadio,
} from "../../forms/FormView";
import { useEffect } from "react";

interface Props {
    extended?: boolean;
}

const LeaveFormFields = ({ extended }: Props) => {
    const form = useFormState();

    useEffect(() => {
        console.log(form.values);
    }, [form]);

    const { isLoading } = useSelector((state: RootState) => state.leave);

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
            <FormRadio
                options={{ label: "Hod Status", name: "hodStatus" }}
                values={["pending", "approved", "rejected"]}
            />
            <FormRadio
                options={{ label: "Admin Status", name: "adminStatus" }}
                values={["pending", "approved", "rejected"]}
            />
        </div>
    );
};

export default LeaveFormFields;
