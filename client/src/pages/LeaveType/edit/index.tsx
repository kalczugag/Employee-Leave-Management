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
            .catch((err) => handleOpen(err))
            .finally(() => {
                navigate("../list");
                handleOpen("Leave Type Update Successful");
            });
    };

    return (
        <DefaultPage label="Edit Leave Type" bg>
            <FormView onSubmit={handleSubmit} initialValues={data}>
                <FormField
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
                <FormCheckbox
                    options={{ label: "Leave Type Status", name: "active" }}
                    disabled={isLoading}
                />
            </FormView>
        </DefaultPage>
    );
};

export default LeaveTypeEdit;
