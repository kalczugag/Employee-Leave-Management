import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    RootState,
    AppDispatch,
    getLeaves,
    deleteLeave,
    setEmployee,
    StatusUnion,
    getEmployeesByIds,
} from "../store";
import useThunk from "./useThunk";
import useSnackbar from "./useSnackbar";
import useAuth from "./useAuth";
import _ from "lodash";

const useExtendedLeaves = (status?: StatusUnion["status"]) => {
    const dispatch = useDispatch<AppDispatch>();
    const { handleOpen } = useSnackbar();
    const { user } = useAuth();

    const [doFetchLeaves] = useThunk(getLeaves);
    const [doFetchEmployee] = useThunk(getEmployeesByIds);

    const leavesData = useSelector((state: RootState) => state.leave);
    const employeesData = useSelector((state: RootState) => state.employee);

    const leavesOptions = {
        // fields: '',
        // page: 1,
        // pageSize: 5,
        status,
    };

    const handleDelete = (id: string) => {
        dispatch(deleteLeave(id))
            .unwrap()
            .then(() => handleOpen("Leave Removed Successfully"))
            .catch((err) => handleOpen(err.message, "error"));
    };

    const hasAccess =
        user?.roles.includes("admin") || user?.roles.includes("hod");

    useEffect(() => {
        if (leavesData.data.length === 0 && hasAccess) {
            doFetchLeaves(leavesOptions);
        } else if (!leavesOptions.status && !leavesData.fullData && hasAccess) {
            doFetchLeaves(leavesOptions);
        } else if (employeesData.data.length === 0 && hasAccess) {
            fetchEmployeesById();
        } else if (
            (leavesData.data.length === 0 ||
                !leavesOptions.status ||
                !leavesData.fullData) &&
            !hasAccess
        ) {
            doFetchLeaves({ ...leavesData, userId: user!._id });
            if (user) {
                dispatch(setEmployee(user));
            }
        }
    }, [leavesData.data.length, leavesData.fullData]);

    const fetchEmployeesById = async () => {
        const leaveUsersIds = leavesData.data.map((e) => e._user);
        const uniqueIds = _.uniqBy(leaveUsersIds, (e) => e);

        const employeesOptions = {
            ids: uniqueIds,
            selectQuery:
                "address,birthDate,createdAt,departmentId,gender,mobile,roles,updatedAt,__v",
        };

        if (leaveUsersIds) {
            doFetchEmployee(employeesOptions);
        }
    };

    const extendedLeaves = useMemo(() => {
        if (status) {
            return leavesData.data
                .filter(
                    (row) =>
                        row.hodStatus === status || row.adminStatus === status
                )
                .map((row) => {
                    const userData =
                        employeesData.data.find((e) => e._id === row._user) ||
                        null;
                    return {
                        ...row,
                        userData,
                        isLoading: leavesData.isLoading,
                        handleDelete: () => handleDelete(row._id!),
                    };
                });
        }
        return leavesData.data.map((row) => {
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

    return leavesData.data.length === 0 || employeesData.data.length === 0
        ? null
        : extendedLeaves;
};

export default useExtendedLeaves;
