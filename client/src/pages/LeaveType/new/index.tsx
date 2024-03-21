import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState, addLeaveType } from "../../../store";
import useSnackbar from "../../../hooks/useSnackbar";
import DefaultPage from "../../../layout/DefaultPage";
import { FormView, FormField, FormEditor } from "../../../forms/FormView";

const LeaveTypeNew = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { handleOpen } = useSnackbar();

    const { isLoading } = useSelector((state: RootState) => state.leaveType);

    const handleSubmit = (values: any) => {
        dispatch(addLeaveType(values))
            .unwrap()
            .catch((err) => handleOpen(err.message, "error"))
            .finally(() => {
                navigate("../list");
                handleOpen("Department Create Successful");
            });
    };

    return (
        <DefaultPage label="Create Leave Type" bg>
            <FormView onSubmit={handleSubmit}>
                <FormField
                    required
                    options={{ label: "Leave Type Name", name: "name" }}
                    disabled={isLoading}
                />
                <FormField
                    options={{
                        label: "Leave Type Short Name",
                        name: "shortName",
                    }}
                    disabled={isLoading}
                />
                <FormEditor
                    options={{ label: "Leave Type Details", name: "details" }}
                    disabled={isLoading}
                />
            </FormView>
        </DefaultPage>
    );
};

export default LeaveTypeNew;
