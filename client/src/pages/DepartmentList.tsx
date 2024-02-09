import DefaultPage from "../layout/DefaultPage";
import ActionButtons from "../components/ActionButtons";
import ListSearchForm from "../forms/ListSearchForm";
import BasicTable from "../components/Table";

const DepartmentList = () => {
    return (
        <DefaultPage label="Department List" bg>
            <ActionButtons label="Add Department" />
            <ListSearchForm />
            <BasicTable />
        </DefaultPage>
    );
};

export default DepartmentList;
