import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
    AppDispatch,
    RootState,
    editLeaveType,
    getLeaveType,
} from "../../../store";
import useThunk from "../../../hooks/useThunk";
import useSnackbar from "../../../hooks/useSnackbar";
import useAuth from "../../../hooks/useAuth";
import {
    FormView,
    FormField,
    FormEditor,
    FormCheckbox,
} from "../../../forms/FormView";
import DefaultPage from "../../../layout/DefaultPage";

const LeaveTypeEdit = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { handleOpen } = useSnackbar();
    const { user } = useAuth();

    const [doFetchLeaveType, isFetching] = useThunk(getLeaveType);

    const { isLoading } = useSelector((state: RootState) => state.leaveType);
    const data = useSelector((state: RootState) =>
        state.leaveType.data.find((value) => value._id === id)
    );

    useEffect(() => {
        if (!data && !isFetching) {
            doFetchLeaveType(id);
        }
    }, []);

    const handleSubmit = (values: any) => {
        dispatch(editLeaveType(values))
            .unwrap()
            .catch((err) => handleOpen(err.message, "error"))
            .finally(() => {
                navigate("../list");
                handleOpen("Leave Type Update Successful");
            });
    };

    return (
        <DefaultPage label="Edit Leave Type" bg>
            <FormView
                onSubmit={handleSubmit}
                initialValues={data}
                disabled={
                    isLoading ||
                    !user?.roles.includes("hod") ||
                    !user?.roles.includes("admin")
                }
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
                    options={{ label: "Leave Type Details", name: "details" }}
                />
                <FormCheckbox
                    options={{ label: "Leave Type Status", name: "active" }}
                />
            </FormView>
        </DefaultPage>
    );
};

export default LeaveTypeEdit;
