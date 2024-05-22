import { useMemo } from "react";
import _ from "lodash";
import {
    StatusUnion,
    useDeleteLeaveMutation,
    useGetEmployeesQuery,
    useGetLeavesQuery,
} from "../store";
import useSnackbar from "./useSnackbar";

const useExtendedLeaves = (status?: StatusUnion["status"]) => {
    const { handleOpen } = useSnackbar();

    const leavesData = useGetLeavesQuery();
    const employeesData = useGetEmployeesQuery();

    const [deleteLeave, result] = useDeleteLeaveMutation();

    const fetchEmployeesById = () => {
        _.chain(leavesData.data)
            .map("_user")
            .uniq()
            .reject((id) =>
                employeesData.data!.some((employee) => employee._id === id)
            )
            .tap((newIdsToFetch) => {
                console.log(newIdsToFetch);

                if (newIdsToFetch.length > 0) {
                    const employeesOptions = {
                        ids: newIdsToFetch,
                        selectQuery:
                            "address,birthDate,createdAt,departmentId,gender,mobile,roles,updatedAt,__v",
                    };
                }
            })
            .value();
    };

    const handleDelete = (id: string) => {
        deleteLeave(id).then(() => handleOpen("Leave Removed Successfully"));
    };

    const extendedLeaves = useMemo(() => {
        let filteredLeaves = leavesData.data || [];

        if (Array.isArray(filteredLeaves)) {
            if (status) {
                filteredLeaves = filteredLeaves.filter(
                    (row) => row.status === status
                );
            }

            return filteredLeaves.map((row) => {
                const userData =
                    employeesData.data!.find((e) => e._id === row._user) ||
                    null;
                return {
                    ...row,
                    userData,
                    isLoading: leavesData.isLoading,
                    handleDelete: () => handleDelete(row._id!),
                };
            });
        }

        return filteredLeaves;
    }, [leavesData.data, employeesData.data, status]);

    return extendedLeaves;
};

export default useExtendedLeaves;
