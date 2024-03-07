import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import DefaultPage from "../../../layout/DefaultPage";
import { FormView, FormField, FormEditor } from "../../../forms/FormView";
import { EditorProps } from "react-draft-wysiwyg";

const LeaveTypeNew = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (values: any) => {
        // dispatch(addLeaveType(values));
        console.log(values);
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
