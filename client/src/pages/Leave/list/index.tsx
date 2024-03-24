import { useDispatch, useSelector } from "react-redux";
import {
    AppDispatch,
    RootState,
    deleteLeave,
    getEmployee,
} from "../../../store";
import useSnackbar from "../../../hooks/useSnackbar";
import useThunk from "../../../hooks/useThunk";
import BasicTable from "../../../components/Table";
import ListSearchForm from "../../../forms/SearchForm";
import DefaultPage from "../../../layout/DefaultPage";
import { fields } from "./config";
import { useMemo } from "react";

const LeaveList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { handleOpen } = useSnackbar();

    const [doFetchEmployee, isFetching] = useThunk(getEmployee);

    const { leavesData, isLoadingLeaves } = useSelector((state: RootState) => {
        return {
            leavesData: state.leave.data,
            isLoadingLeaves: state.leave.isLoading,
        };
    });
    const { employeesData, isLoadingEmployees } = useSelector(
        (state: RootState) => {
            return {
                employeesData: state.employee.data,
                isLoadingEmployees: state.employee.isLoading,
            };
        }
    );

    const data = useMemo(
        () =>
            leavesData.map((row) => ({
                ...row,
                isLoadingLeaves,
                handleDelete: () => handleDelete(row._id),
            })),
        [leavesData]
    );

    if (leavesData.length === 0 || employeesData.length === 0) {
        console.log("first");
        return null;
    }

    const handleDelete = (id: string) => {
        console.log(id);
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
            <BasicTable headerOptions={fields} rowData={[""]} />
        </DefaultPage>
    );
};

export default LeaveList;
