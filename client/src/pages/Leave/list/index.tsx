import { useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getLeaves,
    getEmployeesByIds,
    RootState,
    AppDispatch,
    deleteLeave,
} from "../../../store";
import _ from "lodash";
import { fields } from "../config";
import ListSearchForm from "../../../forms/SearchForm";
import useSnackbar from "../../../hooks/useSnackbar";
import useThunk from "../../../hooks/useThunk";
import DefaultPage from "../../../layout/DefaultPage";
import BasicTable from "../../../components/Table";

const LeaveList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { handleOpen } = useSnackbar();

    const [doFetchLeaves] = useThunk(getLeaves);
    const [doFetchEmployee] = useThunk(getEmployeesByIds);

    const leavesData = useSelector((state: RootState) => state.leave);
    const employeesData = useSelector((state: RootState) => state.employee);

    const fetchEmployeesById = useCallback(() => {
        const newIdsToFetch = _.chain(leavesData.data)
            .map("_user")
            .uniq()
            .reject((id) =>
                employeesData.data.some((employee) => employee._id === id)
            )
            .value();

        if (newIdsToFetch.length > 0) {
            const employeesOptions = {
                ids: newIdsToFetch,
                selectQuery:
                    "address,birthDate,createdAt,departmentId,gender,mobile,roles,updatedAt,__v",
            };

            doFetchEmployee(employeesOptions);
        }
    }, [leavesData.data, employeesData.data, doFetchEmployee]);

    useEffect(() => {
        if (!leavesData.fullData) {
            doFetchLeaves();
        }
    }, [doFetchLeaves]);

    useEffect(() => {
        if (leavesData.data.length > 0) {
            console.log("first");
            fetchEmployeesById();
        }
    }, [leavesData.data.length]);

    const handleDelete = (id: string) => {
        dispatch(deleteLeave(id))
            .unwrap()
            .then(() => handleOpen("Leave Removed Successfully"))
            .catch((err) => handleOpen(err.message, "error"));
    };

    const extendedLeaves = useMemo(() => {
        if (!leavesData.data) {
            return [];
        }

        return leavesData.data.map((row) => {
            const userData =
                employeesData.data?.find((e) => e._id === row._user) || null;
            return {
                ...row,
                userData,
                isLoading: leavesData.isLoading,
                handleDelete: () => handleDelete(row._id!),
            };
        });
    }, [leavesData.data, employeesData.data]);

    const dd = [
        { label: "1" },
        { label: "2" },
        { label: "3" },
        { label: "4" },
        { label: "5" },
        { label: "6" },
        { label: "7" },
        { label: "8" },
        { label: "9" },
    ];

    return (
        <DefaultPage label="Leave List" bg>
            <ListSearchForm data={dd} />
            <BasicTable headerOptions={fields} rowData={extendedLeaves} />
        </DefaultPage>
    );
};
export default LeaveList;
