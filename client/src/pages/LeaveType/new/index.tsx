import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState, addLeaveType } from "../../../store";
import useAuth from "../../../hooks/useAuth";
import useSnackbar from "../../../hooks/useSnackbar";
import DefaultPage from "../../../layout/DefaultPage";
import { FormView, FormField, FormEditor } from "../../../forms/FormView";

const LeaveTypeNew = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { handleOpen } = useSnackbar();
    const { user } = useAuth();

    const { isLoading } = useSelector((state: RootState) => state.leaveType);

    const handleSubmit = (values: any) => {
        dispatch(addLeaveType(values))
            .then(() => {
                navigate("../list");
                handleOpen("Department Create Successful");
            })
            .catch((err) => handleOpen(err.message, "error"));
    };

    return (
        <DefaultPage label="Create Leave Type" bg>
            <FormView
                onSubmit={handleSubmit}
                disabled={isLoading || user?.roles === "staff"}
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
