import { useDispatch, useSelector } from "react-redux";
import {
    AppDispatch,
    RootState,
    deleteLeave,
    getEmployee,
    getLeaves,
} from "../../../store";
import useSnackbar from "../../../hooks/useSnackbar";
import useThunk from "../../../hooks/useThunk";
import BasicTable from "../../../components/Table";
import ListSearchForm from "../../../forms/SearchForm";
import DefaultPage from "../../../layout/DefaultPage";
import { fields } from "./config";
import { useEffect, useMemo } from "react";

const LeaveList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { handleOpen } = useSnackbar();

    const [doFetchLeaves] = useThunk(getLeaves);
    const [doFetchEmployee] = useThunk(getEmployee);

    const leavesData = useSelector((state: RootState) => state.leave);
    const employeesData = useSelector((state: RootState) => state.employee);

    const data = useMemo(
        () =>
            leavesData.data.map((row) => {
                const index = employeesData.data.findIndex(
                    (e) => e._id === row._user
                );

                const userData =
                    index !== -1 ? employeesData.data[index] : null;

                return {
                    ...row,
                    userData: userData,
                    isLoading: leavesData.isLoading,
                    handleDelete: () => handleDelete(row._id!),
                };
            }),
        [leavesData, employeesData.data]
    );

    const fetchEployeesById = async () => {
        leavesData.data.map((leaf) => {
            const userId = leaf._user;

            const employeeData = doFetchEmployee({
                id: userId,
                selectQuery:
                    "address,birthDate,createdAt,departmentId,gender,mobile,roles,updatedAt,__v",
            });
            return {
                ...leaf,
                employee: employeeData,
            };
        });
    };

    useEffect(() => {
        if (leavesData.data.length === 0) {
            doFetchLeaves();
        } else if (employeesData.data.length === 0) {
            fetchEployeesById();
        }
    }, [doFetchLeaves, employeesData.data.length, leavesData.data.length]);

    if (leavesData.data.length === 0 || employeesData.data.length === 0) {
        return null;
    }

    const handleDelete = (id: string) => {
        dispatch(deleteLeave(id))
            .unwrap()
            .catch((err) => handleOpen(err.message, "error"))
            .finally(() => {
                handleOpen("Leave Remove Successful");
            });
    };

    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <DefaultPage label="Leave List" bg>
            <ListSearchForm onSubmit={handleSubmit} />
            <BasicTable headerOptions={fields} rowData={data} />
        </DefaultPage>
    );
};

export default LeaveList;
