import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    RootState,
    AppDispatch,
    getLeaves,
    deleteLeave,
    StatusUnion,
    getEmployeesByIds,
} from "../store";
import useThunk from "./useThunk";
import useSnackbar from "./useSnackbar";
import useAuth from "./useAuth";
import _ from "lodash";
import usePageAndRows from "./usePageAndRows";

const useExtendedLeaves = (status?: StatusUnion["status"]) => {
    const dispatch = useDispatch<AppDispatch>();
    const { handleOpen } = useSnackbar();
    const { user } = useAuth();
    const { page, rowsPerPage } = usePageAndRows();

    const [doFetchLeaves] = useThunk(getLeaves);
    const [doFetchEmployee] = useThunk(getEmployeesByIds);

    const leavesData = useSelector((state: RootState) => state.leave);
    const employeesData = useSelector((state: RootState) => state.employee);

    useEffect(() => {
        if (user) {
            const leavesOptions = { page, pageSize: rowsPerPage, status };

            if (
                leavesData.data.length === 0 ||
                (!status && !leavesData.fullData)
            ) {
                doFetchLeaves(leavesOptions);
            } else if (leavesData.data.length < page * rowsPerPage) {
                doFetchLeaves(leavesOptions);
            }

            if (employeesData.data.length === 0) {
                fetchEmployeesById();
            }
        }
    }, [user, leavesData.fullData, status, page, rowsPerPage]);

    const fetchEmployeesById = async () => {
        const leaveUsersIds = leavesData.data.map((e) => e._user);
        const uniqueIds = _.uniqBy(leaveUsersIds, (e) => e);

        const employeesOptions = {
            ids: uniqueIds,
            selectQuery:
                "address,birthDate,createdAt,departmentId,gender,mobile,roles,updatedAt,__v",
        };

        if (leaveUsersIds.length > 0) {
            doFetchEmployee(employeesOptions);
        }
    };

    const handleDelete = (id: string) => {
        dispatch(deleteLeave(id))
            .unwrap()
            .then(() => handleOpen("Leave Removed Successfully"))
            .catch((err) => handleOpen(err.message, "error"));
    };

    const extendedLeaves = useMemo(() => {
        let filteredLeaves = leavesData.data;
        if (status) {
            filteredLeaves = filteredLeaves.filter(
                (row) => row.hodStatus === status || row.adminStatus === status
            );
        }

        return filteredLeaves.map((row) => {
            const userData =
                employeesData.data.find((e) => e._id === row._user) || null;
            return {
                ...row,
                userData,
                isLoading: leavesData.isLoading,
                handleDelete: () => handleDelete(row._id!),
            };
        });
    }, [leavesData.data, employeesData.data, status]);

    return extendedLeaves;
};

export default useExtendedLeaves;
