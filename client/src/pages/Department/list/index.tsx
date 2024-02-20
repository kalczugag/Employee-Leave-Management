import DefaultPage from "../../../layout/DefaultPage";
import ActionButtons from "../../../components/ActionButtons";
import ListSearchForm from "../../../forms/SearchForm";
import BasicTable from "../../../components/Table";
import { config } from "./config";

const DepartmentList = () => {
    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <DefaultPage label="Department List" bg>
            <ActionButtons label="Add Department" />
            <ListSearchForm onSubmit={handleSubmit} />
            <BasicTable
                headerOptions={config.headerOptions}
                rowData={config.rows}
            />
        </DefaultPage>
    );
};

export default DepartmentList;
