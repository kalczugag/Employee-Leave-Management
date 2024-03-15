import ListSearchForm from "../../../forms/SearchForm";
import DefaultPage from "../../../layout/DefaultPage";
import BasicTable from "../../../components/Table";
import ActionButtons from "../../../components/ActionButtons";
import { fields } from "./config";

const EmployeeList = () => {
    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <DefaultPage label="Employee List" bg>
            <ActionButtons label="Add Employee" />
            <ListSearchForm onSubmit={handleSubmit} />
            <BasicTable headerOptions={fields} rowData={[""]} />
        </DefaultPage>
    );
};

export default EmployeeList;
