import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    AppDispatch,
    RootState,
    editLeave,
    getLeave,
    LeaveProps,
} from "../../../store";
import useThunk from "../../../hooks/useThunk";
import useSnackbar from "../../../hooks/useSnackbar";
import useNamesList from "../../../hooks/useNamesList";
import useAuth from "../../../hooks/useAuth";
import DefaultPage from "../../../layout/DefaultPage";
import { FormView } from "../../../forms/FormView";
import LeaveFormFields from "../../../containers/Forms/LeaveFormFields";

const LeaveEdit = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { handleOpen } = useSnackbar();
    const { user } = useAuth();
    const { namesList } = useNamesList("leaveType");

    const [doFetchLeave] = useThunk(getLeave);

    const { isLoading } = useSelector((state: RootState) => state.leave);
    const leavesData = useSelector((state: RootState) =>
        state.leave.data.find((value) => value._id === id)
    );

    useEffect(() => {
        if (!leavesData && !isLoading) {
            doFetchLeave(id);
        }
    }, []);

    const handleSubmit = (values: LeaveProps) => {
        if (!leavesData || !values) {
            return;
        }

        let hasChanged = false;

        for (const key in values) {
            if (
                values[key as keyof LeaveProps] !==
                leavesData[key as keyof LeaveProps]
            ) {
                hasChanged = true;
                break;
            }
        }

        if (hasChanged) {
            dispatch(editLeave(values))
                .then(() => {
                    navigate("../list");
                    handleOpen("Leave Update Successful");
                })
                .catch((err) => handleOpen(err.message, "error"));
        } else {
            handleOpen("No changes detected", "error");
        }
    };

    if (!leavesData || namesList.length === 0) {
        return null;
    }

    return (
        <DefaultPage label="Edit Leave" bg>
            <FormView
                onSubmit={handleSubmit}
                initialValues={{
                    ...leavesData,
                    values: namesList,
                }}
            >
                <LeaveFormFields extended={user?.roles === "admin"} />
            </FormView>
        </DefaultPage>
    );
};

export default LeaveEdit;
