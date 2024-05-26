import { useNavigate } from "react-router-dom";
import { useAddLeaveTypeMutation } from "../../../store";
import useAuth from "../../../hooks/useAuth";
import useSnackbar from "../../../hooks/useSnackbar";
import DefaultPage from "../../../layout/DefaultPage";
import { FormView, FormField, FormEditor } from "../../../forms/FormView";
import type { LeaveType } from "@typ/leaveType";

const LeaveTypeNew = () => {
    const navigate = useNavigate();
    const { handleOpen } = useSnackbar();
    const { user } = useAuth();

    const [addLeaveType, result] = useAddLeaveTypeMutation();

    const handleSubmit = (values: LeaveType) => {
        addLeaveType(values).then(() => {
            navigate("../list");
            handleOpen("Department Create Successful");
        });
    };

    return (
        <DefaultPage label="Create Leave Type" bg>
            <FormView
                onSubmit={handleSubmit}
                disabled={result.isLoading || user?.roles === "staff"}
            >
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
