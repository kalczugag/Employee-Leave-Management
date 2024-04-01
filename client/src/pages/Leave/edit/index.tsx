import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState, editLeave, getLeave } from "../../../store";
import useThunk from "../../../hooks/useThunk";
import useSnackbar from "../../../hooks/useSnackbar";
import useNamesList from "../../../hooks/useNamesList";
import DefaultPage from "../../../layout/DefaultPage";
import { FormView } from "../../../forms/FormView";
import LeaveFormFields from "../../../components/LeaveFormFields";

const LeaveEdit = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { handleOpen } = useSnackbar();
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

    const handleSubmit = (values: any) => {
        dispatch(editLeave(values))
            .unwrap()
            .catch((err) => handleOpen(err.message, "error"))
            .finally(() => {
                navigate("../list");
                handleOpen("Leave Update Successful");
            });
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
                    leaveTypes: namesList,
                }}
            >
                <LeaveFormFields />
            </FormView>
        </DefaultPage>
    );
};

export default LeaveEdit;
