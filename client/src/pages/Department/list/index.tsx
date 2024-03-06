import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepartments, AppDispatch, RootState } from "../../../store";
import DefaultPage from "../../../layout/DefaultPage";
import ActionButtons from "../../../components/ActionButtons";
import ListSearchForm from "../../../forms/SearchForm";
import BasicTable from "../../../components/Table";
import { fields } from "./config";

const DepartmentList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, isLoading } = useSelector(
        (state: RootState) => state.department
    );

    useEffect(() => {
        if (data.length === 0 && !isLoading) {
            dispatch(getDepartments());
        }
    }, [dispatch]);

    if (!data && isLoading) {
        return null;
    }

    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <DefaultPage label="Department List" bg>
            <ActionButtons label="Add Department" />
            <ListSearchForm onSubmit={handleSubmit} />
            <BasicTable headerOptions={fields} rowData={data} />
        </DefaultPage>
    );
};

export default DepartmentList;
