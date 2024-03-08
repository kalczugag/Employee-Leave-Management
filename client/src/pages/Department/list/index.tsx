import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getDepartments, RootState } from "../../../store";
import useThunk from "../../../hooks/useThunk";
import DefaultPage from "../../../layout/DefaultPage";
import ActionButtons from "../../../components/ActionButtons";
import ListSearchForm from "../../../forms/SearchForm";
import BasicTable from "../../../components/Table";
import { fields } from "./config";

const DepartmentList = () => {
    const [doFetchDepartments] = useThunk(getDepartments);
    const { data, isLoading } = useSelector(
        (state: RootState) => state.department
    );

    useEffect(() => {
        if (data.length === 0 || (data.length === 1 && !isLoading)) {
            doFetchDepartments();
        }
    }, [doFetchDepartments]);

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
