import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    RootState,
    AppDispatch,
    getLeaves,
    getEmployee,
    deleteLeave,
    StatusUnion,
} from "../store";
import useThunk from "./useThunk";
import useSnackbar from "./useSnackbar";

const useExtendedLeaves = ({ status }: StatusUnion) => {
    const dispatch = useDispatch<AppDispatch>();
    const { handleOpen } = useSnackbar();
    const [doFetchLeaves] = useThunk(getLeaves);
    const [doFetchEmployee] = useThunk(getEmployee);

    const leavesData = useSelector((state: RootState) => state.leave);
    const employeesData = useSelector((state: RootState) => state.employee);

    const options = {
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
            doFetchLeaves(options);
        } else if (employeesData.data.length === 0) {
            fetchEmployeesById();
        }
    }, [leavesData.data.length]);

    const fetchEmployeesById = async () => {
        leavesData.data.forEach((leaf) => {
            const userId = leaf._user;
            try {
                doFetchEmployee({
                    id: userId,
                    selectQuery:
                        "address,birthDate,createdAt,departmentId,gender,mobile,roles,updatedAt,__v",
                });
            } catch (err) {
                console.error("Error fetching employee:", err);
            }
        });
    };

    const extendedLeaves = useMemo(() => {
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
    }, [leavesData.data, employeesData.data]);

    return leavesData.data.length === 0 || employeesData.data.length === 0
        ? null
        : extendedLeaves;
};

export default useExtendedLeaves;
