import DefaultPage from "../../layout/DefaultPage";
import ActionButtons from "../../components/ActionButtons";
import ListSearchForm from "../../forms/ListSearchForm";
import BasicTable from "../../components/Table";
import { config } from "./config";

const LeaveTypeList = () => {
    return (
        <DefaultPage label="Leave Type List" bg>
            <ActionButtons label="Add Department" />
            <ListSearchForm />
            <BasicTable
                headerOptions={config.headerOptions}
                rowData={config.rows}
            />
        </DefaultPage>
    );
};

export default LeaveTypeList;
