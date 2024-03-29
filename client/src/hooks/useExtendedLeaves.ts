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
import _ from "lodash";

const useExtendedLeaves = ({ status }: StatusUnion) => {
    const dispatch = useDispatch<AppDispatch>();
    const { handleOpen } = useSnackbar();
    const [doFetchLeaves] = useThunk(getLeaves);
    const [doFetchEmployee] = useThunk(getEmployeesByIds);

    const leavesData = useSelector((state: RootState) => state.leave);
    const employeesData = useSelector((state: RootState) => state.employee);

    const LeavesOptions = {
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

    useEffect(() => {
        if (leavesData.data.length === 0) {
            doFetchLeaves(LeavesOptions);
        } else if (employeesData.data.length === 0) {
            fetchEmployeesById();
        }
    }, [leavesData.data.length]);

    const fetchEmployeesById = async () => {
        const leaveUsersIds = leavesData.data.map((e) => e._user);
        const uniqueIds = _.uniqBy(leaveUsersIds, (e) => e);

        const employeesOptions = {
            ids: uniqueIds,
            selectQuery:
                "address,birthDate,createdAt,departmentId,gender,mobile,roles,updatedAt,__v",
        };

        doFetchEmployee(employeesOptions);
    };

    const extendedLeaves = useMemo(() => {
        return leavesData.data.map((row) => {
            const userData =
                employeesData.data.find((e) => e._id === row._user) || null;
            console.log(userData);
            return {
                ...row,
                userData,
                isLoading: leavesData.isLoading,
                handleDelete: () => handleDelete(row._id!),
            };
        });
    }, [leavesData.data, employeesData.data]);

    return leavesData.data.length === 0 || employeesData.data.length === 0
        ? null
        : extendedLeaves;
};

export default useExtendedLeaves;
