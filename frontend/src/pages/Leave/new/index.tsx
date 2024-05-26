import { useNavigate } from "react-router-dom";
import { useAddLeaveMutation } from "../../../store";
import useSnackbar from "../../../hooks/useSnackbar";
import { FormView } from "../../../forms/FormView";
import DefaultPage from "../../../layout/DefaultPage";
import LeaveFormFields from "../../../containers/Forms/LeaveFormFields";
import { useNamesListLeaveType } from "../../../hooks/useNamesList";
import type { Leave } from "@typ/leave";

const LeaveNew = () => {
    const navigate = useNavigate();
    const { handleOpen } = useSnackbar();
    const namesList = useNamesListLeaveType();

    const [addLeave, result] = useAddLeaveMutation();

    const handleSubmit = (values: Leave) => {
        addLeave(values).then(() => {
            navigate("../list");
            handleOpen("Leave Create Successful");
        });
    };

    return (
        <DefaultPage label="Leave New" bg>
            <FormView
                initialValues={{ values: namesList }}
                onSubmit={handleSubmit}
            >
                <LeaveFormFields isLoading={result.isLoading} />
            </FormView>
        </DefaultPage>
    );
};

export default LeaveNew;
