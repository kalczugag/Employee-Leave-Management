import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { getLeaveTypes, deleteLeaveType, RootState } from "../../../store";
import useThunk from "../../../hooks/useThunk";
import DefaultPage from "../../../layout/DefaultPage";
import ActionButtons from "../../../components/ActionButtons";
import ListSearchForm from "../../../forms/SearchForm";
import BasicTable from "../../../components/Table";
import { fields } from "./config";

const LeaveTypeList = () => {
    const [doFetchLeaveTypes, isFetching] = useThunk(getLeaveTypes);
    const [doDeleteLeave] = useThunk(deleteLeaveType);

    const leaveTypeData = useSelector(
        (state: RootState) => state.leaveType.data
    );

    console.log(leaveTypeData);

    const data = useMemo(
        () =>
            leaveTypeData.map((row) => ({
                ...row,
                handleDelete: () => handleDelete(row._id),
            })),
        [leaveTypeData]
    );

    useEffect(() => {
        if (data.length <= 1 && !isFetching) {
            doFetchLeaveTypes();
        }
    }, []);

    if (!data && isFetching) {
        return null;
    }

    const handleDelete = (id: string) => {
        console.log(id);
        doDeleteLeave(id);
    };

    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <DefaultPage label="Leave Type List" bg>
            <ActionButtons label="Add Leave Type" />
            <ListSearchForm onSubmit={handleSubmit} />
            <BasicTable headerOptions={fields} rowData={data} />
        </DefaultPage>
    );
};

export default LeaveTypeList;
