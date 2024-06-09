import { useMemo } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import {
    RootState,
    useDeleteLeaveMutation,
    useGetEmployeesByIdsQuery,
    useGetLeavesQuery,
} from "../store";
import LeaveTypes from "../utils/leavesType";
import useSnackbar from "./useSnackbar";
import type { StatusUnion } from "@typ/leave";
import useAuth from "./useAuth";

const useExtendedLeaves = (status?: StatusUnion["status"]) => {
    const { handleOpen } = useSnackbar();
    const { user } = useAuth();

    const { page, pageSize } = useSelector((state: RootState) => state.table);

    const options = {
        page,
        pageSize,
        ...(user?.roles === "staff" && { userId: user._id }),
    };

    const { data: leavesData, isFetching: leavesFetching } =
        useGetLeavesQuery(options);
    const [deleteLeave, result] = useDeleteLeaveMutation();

    const [leaves, totalLeavesCount] = useMemo(() => {
        if (LeaveTypes.isResultLeaves(leavesData)) {
            return [leavesData.leaves, leavesData.totalLeavesCount];
        }
        return [];
    }, [leavesData]);

    const handleDelete = (id: string) => {
        deleteLeave(id).then(() => handleOpen("Leave Removed Successfully"));
    };

    const uniqueEmployeeIds = useMemo(() => {
        if (!LeaveTypes.isLeaveArray(leaves)) {
            return [];
        }
        const leaveUsersIds = leaves.map((e) => e._user);
        const uniqueIds = _.uniq(leaveUsersIds).filter(
            (id): id is string => id !== undefined
        );

        return uniqueIds;
    }, [leaves]);

    const { data: employeesData, isFetching: employeesFetching } =
        useGetEmployeesByIdsQuery(
            { ids: uniqueEmployeeIds },
            {
                skip: uniqueEmployeeIds.length === 0,
            }
        );

    const isFetching = leavesFetching || employeesFetching;

    const combinedData = useMemo(() => {
        if (!LeaveTypes.isLeaveArray(leaves) || !Array.isArray(employeesData)) {
            return [];
        }

        let filteredLeaves = leaves;

        if (status) {
            filteredLeaves = filteredLeaves.filter(
                (leave) => leave.status === status
            );
        }

        return filteredLeaves.map((leave) => {
            const employee =
                employeesData.find((emp) => emp._id === leave._user) || null;

            return {
                ...leave,
                userData: employee,
                isLoading: result.isLoading,
                handleDelete: () => handleDelete(leave._id!),
            };
        });
    }, [leaves, employeesData, status, result.isLoading]);

    return {
        data: combinedData,
        isFetching: isFetching || employeesFetching,
        total: totalLeavesCount,
    };
};

export default useExtendedLeaves;
