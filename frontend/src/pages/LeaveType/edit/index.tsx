import { useParams, useNavigate } from "react-router-dom";
import {
    AppDispatch,
    useGetLeaveTypeQuery,
    useEditLeaveTypeMutation,
} from "../../../store";
import useSnackbar from "../../../hooks/useSnackbar";
import useAuth from "../../../hooks/useAuth";
import {
    FormView,
    FormField,
    FormEditor,
    FormCheckbox,
} from "../../../forms/FormView";
import DefaultPage from "../../../layout/DefaultPage";
import type { LeaveType } from "@typ/leaveType";
import NotFound from "@components/NotFound";
import LoadingBackdrop from "@components/LoadingBackdrop";

const LeaveTypeEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { handleOpen } = useSnackbar();
    const { user } = useAuth();

    const { data, isLoading, isSuccess } = useGetLeaveTypeQuery(id || "");
    const [editLeaveType, result] = useEditLeaveTypeMutation();

    if (isLoading) {
        return <LoadingBackdrop isLoading={isLoading} />;
    }

    if (!data || !isSuccess) {
        return <NotFound />;
    }

    const handleSubmit = (values: LeaveType) => {
        editLeaveType(values).then(() => {
            navigate("../list");
            handleOpen("Leave Type Update Successful");
        });
    };

    const disabled = result.isLoading || user?.roles === "staff";

    return (
        <DefaultPage label="Edit Leave Type" bg>
            <FormView
                onSubmit={handleSubmit}
                initialValues={data}
                disabled={disabled}
            >
                <FormField
                    options={{ label: "Leave Type Name", name: "name" }}
                />
                <FormField
                    options={{
                        label: "Leave Type Short Name",
                        name: "shortName",
                    }}
                />
                <FormEditor
                    options={{
                        label: "Leave Type Details",
                        name: "details",
                    }}
                />
                <FormCheckbox
                    options={{
                        label: "Leave Type Status",
                        name: "active",
                    }}
                />
            </FormView>
        </DefaultPage>
    );
};

export default LeaveTypeEdit;
