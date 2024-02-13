import DefaultPage from "../../layout/DefaultPage";
import ActionButtons from "../../components/ActionButtons";
import ListSearchForm from "../../forms/ListSearchForm";
import BasicTable from "../../components/Table";
import { config } from "./config";

const DepartmentList = () => {
    return (
        <DefaultPage label="Department List" bg>
            <ActionButtons label="Add Department" />
            <ListSearchForm />
            <BasicTable
                headerOptions={config.headerOptions}
                rowData={config.rows}
            />
        </DefaultPage>
    );
};

export default DepartmentList;
