import ListSearchForm from "../../forms/ListSearchForm";
import DefaultPage from "../../layout/DefaultPage";
import BasicTable from "../../components/Table";
import { config } from "./config";

const EmployeeList = () => {
    return (
        <DefaultPage label="Employee List" bg>
            <ListSearchForm />
            <BasicTable
                headerOptions={config.headerOptions}
                rowData={config.rows}
            />
        </DefaultPage>
    );
};

export default EmployeeList;
