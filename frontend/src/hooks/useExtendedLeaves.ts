import { useMemo, useEffect } from "react";
import _ from "lodash";
import {
    useDeleteLeaveMutation,
    useGetEmployeesByIdsQuery,
    useGetLeavesQuery,
} from "../store";
import LeaveTypes from "../utils/leavesType";
import useSnackbar from "./useSnackbar";
import type { StatusUnion } from "@typ/leave";
import useAuth from "./useAuth";
import { useSelector } from "react-redux";

const useExtendedLeaves = (status?: StatusUnion["status"]) => {
    const { handleOpen } = useSnackbar();
    const { user } = useAuth();

    const options = {
        ...(user?.roles === "staff" && { userId: user._id }),
    };

    const { data: leavesData, isFetching: leavesFetching } =
        useGetLeavesQuery(options);
    const [deleteLeave, result] = useDeleteLeaveMutation();

    const handleDelete = (id: string) => {
        deleteLeave(id).then(() => handleOpen("Leave Removed Successfully"));
    };

    const uniqueEmployeeIds = useMemo(() => {
        if (!LeaveTypes.isLeaveArray(leavesData)) {
            return [];
        }
        const leaveUsersIds = leavesData.map((e) => e._user);
        const uniqueIds = _.uniq(leaveUsersIds).filter(
            (id): id is string => id !== undefined
        );

        return uniqueIds;
    }, [leavesData]);

    const { data: employeesData, isFetching: employeesFetching } =
        useGetEmployeesByIdsQuery(
            { ids: uniqueEmployeeIds },
            {
                skip: uniqueEmployeeIds.length === 0,
            }
        );

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
                employeesData.find((emp) => emp._id === leave._user) || null;

            return {
                ...leave,
                userData: employee,
                isLoading: result.isLoading,
                handleDelete: () => handleDelete(leave._id!),
            };
        });
    }, [leavesData, employeesData, status, result.isLoading]);

    return { data: combinedData, isFetching: isFetching || employeesFetching };
};

export default useExtendedLeaves;
