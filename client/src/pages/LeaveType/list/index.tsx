import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    AppDispatch,
    getLeaveTypes,
    deleteLeaveType,
    RootState,
} from "../../../store";
import useThunk from "../../../hooks/useThunk";
import useSnackbar from "../../../hooks/useSnackbar";
import useAuth from "../../../hooks/useAuth";
import DefaultPage from "../../../layout/DefaultPage";
import ActionButtons from "../../../components/ActionButtons";
import BasicTable from "../../../components/Table";
import { fields } from "./config";

const LeaveTypeList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { handleOpen } = useSnackbar();
    const { user } = useAuth();

    const [doFetchLeaveTypes, isFetching] = useThunk(getLeaveTypes);

    const { data, isLoading, fullData } = useSelector(
        (state: RootState) => state.leaveType
    );

    const leaveTypeData = useMemo(
        () =>
            data.map((row) => ({
                ...row,
                isLoading,
                userRole: user?.roles,
                handleDelete: () => handleDelete(row._id),
            })),
        [data]
    );

    useEffect(() => {
        if (leaveTypeData.length <= 1 && !isFetching) {
            doFetchLeaveTypes();
        } else if (!fullData) {
            doFetchLeaveTypes();
        }
    }, []);

    if (!leaveTypeData && isFetching) {
        return null;
    }

    const handleDelete = (id: string) => {
        dispatch(deleteLeaveType(id))
            .then(() => {
                handleOpen("Leave Type Remove Successful");
            })
            .catch((err) => handleOpen(err.message, "error"));
    };

    return (
        <DefaultPage label="Leave Type List" bg>
            <ActionButtons
                label="Add Leave Type"
                extended={
                    user?.roles.includes("hod") || user?.roles.includes("admin")
                }
            />
            <BasicTable headerOptions={fields} rowData={leaveTypeData} />
        </DefaultPage>
    );
};

export default LeaveTypeList;
