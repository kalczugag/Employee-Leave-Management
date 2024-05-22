import { useNavigate, useParams } from "react-router-dom";
import {
    LeaveProps,
    useGetLeaveQuery,
    useEditLeaveMutation,
} from "../../../store";
import useSnackbar from "../../../hooks/useSnackbar";
import { useNamesListLeaveType } from "../../../hooks/useNamesList";
import useAuth from "../../../hooks/useAuth";
import DefaultPage from "../../../layout/DefaultPage";
import { FormView } from "../../../forms/FormView";
import LeaveFormFields from "../../../containers/Forms/LeaveFormFields";

const LeaveEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { handleOpen } = useSnackbar();
    const { user } = useAuth();
    const namesList = useNamesListLeaveType();

    const { data } = useGetLeaveQuery(id || "");
    const [editLeave, result] = useEditLeaveMutation();

    const handleSubmit = (values: LeaveProps) => {
        editLeave(values).then(() => {
            navigate("../list");
            handleOpen("Leave Update Successful");
        });
    };

    return (
        <DefaultPage label="Edit Leave" bg>
            <FormView
                onSubmit={handleSubmit}
                initialValues={{
                    ...data,
                    values: namesList,
                }}
            >
                <LeaveFormFields
                    extended={user?.roles === "admin"}
                    isLoading={result.isLoading}
                />
            </FormView>
        </DefaultPage>
    );
};

export default LeaveEdit;
