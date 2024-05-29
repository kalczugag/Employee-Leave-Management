import { useMemo } from "react";
import {
    useDeleteLeaveMutation,
    useGetEmployeesQuery,
    useGetLeavesQuery,
} from "../store";
import LeaveTypes from "../utils/leavesType";
import useSnackbar from "./useSnackbar";
import type { StatusUnion } from "@typ/leave";
import useAuth from "./useAuth";

const useExtendedLeaves = (status?: StatusUnion["status"]) => {
    const { handleOpen } = useSnackbar();
    const { user } = useAuth();

    const options = {
        ...(user?.roles === "staff" && { userId: user._id }),
    };

    const { data: leavesData, isFetching: leavesFetching } =
        useGetLeavesQuery(options);
    const { data: employeesData, isFetching: employeesFetching } =
        useGetEmployeesQuery();
    const [deleteLeave, result] = useDeleteLeaveMutation();

    const handleDelete = (id: string) => {
        deleteLeave(id).then(() => handleOpen("Leave Removed Successfully"));
    };

    const isFetching = leavesFetching || employeesFetching;

    const combinedData = useMemo(() => {
        if (
            !LeaveTypes.isLeaveArray(leavesData) ||
            !Array.isArray(employeesData)
        ) {
            return [];
        }

        let filteredLeaves = leavesData;

        if (status) {
            filteredLeaves = filteredLeaves.filter(
                (leave) => leave.status === status
            );
        }

        return filteredLeaves.map((leave) => {
            const employee =
                employeesData.find(
                    (employee) => employee._id === leave._user
                ) || null;

            return {
                ...leave,
                userData: employee,
                isLoading: result.isLoading,
                handleDelete: () => handleDelete(leave._id!),
            };
        });
    }, [leavesData, employeesData, status]);

    return { data: combinedData, isFetching };
};

export default useExtendedLeaves;
