import { useDispatch, useSelector } from "react-redux";
import { getLeaveTypes, AppDispatch, RootState } from "../../../store";
import DefaultPage from "../../../layout/DefaultPage";
import ActionButtons from "../../../components/ActionButtons";
import ListSearchForm from "../../../forms/SearchForm";
import BasicTable from "../../../components/Table";
import { fields } from "./config";
import { useEffect } from "react";

const LeaveTypeList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, isLoading } = useSelector(
        (state: RootState) => state.leaveType
    );

    useEffect(() => {
        if (data.length === 0 || (data.length === 1 && !isLoading)) {
            dispatch(getLeaveTypes());
        }
    }, [dispatch]);

    if (!data && isLoading) {
        return null;
    }

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
