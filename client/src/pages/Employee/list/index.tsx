import ListSearchForm from "../../../forms/SearchForm";
import DefaultPage from "../../../layout/DefaultPage";
import BasicTable from "../../../components/Table";
import ActionButtons from "../../../components/ActionButtons";
import { config } from "./config";

const EmployeeList = () => {
    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <DefaultPage label="Employee List" bg>
            <ActionButtons label="Add Employee" />
            <ListSearchForm onSubmit={handleSubmit} />
            <BasicTable
                headerOptions={config.headerOptions}
                rowData={config.rows}
            />
        </DefaultPage>
    );
};

export default EmployeeList;
