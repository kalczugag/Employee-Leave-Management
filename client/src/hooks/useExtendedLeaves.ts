import { useMemo } from "react";
import {
    StatusUnion,
    useDeleteLeaveMutation,
    useGetEmployeesQuery,
    useGetLeavesQuery,
} from "../store";
import { isLeaveArray } from "../utils/isLeaveArray";
import useSnackbar from "./useSnackbar";

const useExtendedLeaves = (status?: StatusUnion["status"]) => {
    const { handleOpen } = useSnackbar();

    const { data: leavesData } = useGetLeavesQuery();
    const { data: employeesData } = useGetEmployeesQuery();
    const [deleteLeave, result] = useDeleteLeaveMutation();

    const handleDelete = (id: string) => {
        deleteLeave(id).then(() => handleOpen("Leave Removed Successfully"));
    };

    const combinedData = useMemo(() => {
        if (!isLeaveArray(leavesData) || !Array.isArray(employeesData)) {
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

    return combinedData;
};

export default useExtendedLeaves;
