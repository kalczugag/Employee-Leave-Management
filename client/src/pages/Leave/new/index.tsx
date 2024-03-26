import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    AppDispatch,
    RootState,
    addLeave,
    LeaveProps,
    getLeaveTypes,
} from "../../../store";
import useSnackbar from "../../../hooks/useSnackbar";
import useThunk from "../../../hooks/useThunk";
import { FormView } from "../../../forms/FormView";
import DefaultPage from "../../../layout/DefaultPage";
import LeaveFormFields from "../../../components/LeaveFormFields";

const LeaveNew = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { handleOpen } = useSnackbar();

    const [doFetchLeaveTypes, isFetchingLeaveTypes] = useThunk(getLeaveTypes);

    const leaveTypesData = useSelector(
        (state: RootState) => state.leaveType.data
    );

    const leaveTypesNames: string[] = leaveTypesData.map(
        (leaveType) => leaveType.name
    );

    useEffect(() => {
        if (leaveTypesData.length === 0 && !isFetchingLeaveTypes) {
            doFetchLeaveTypes(
                "shortName,details,status,createdAt,updatedAt,__v"
            );
        }
    }, []);

    const handleSubmit = (values: LeaveProps) => {
        dispatch(addLeave(values))
            .unwrap()
            .catch((err) => handleOpen(err.message, "error"))
            .finally(() => {
                navigate("../list");
                handleOpen("Leave Create Successful");
            });
    };

    return (
        <DefaultPage label="Leave New" bg>
            <FormView
                initialValues={{ departments: leaveTypesNames }}
                onSubmit={handleSubmit}
            >
                <LeaveFormFields />
            </FormView>
        </DefaultPage>
    );
};

export default LeaveNew;
