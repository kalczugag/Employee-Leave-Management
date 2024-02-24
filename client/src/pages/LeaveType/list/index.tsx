import DefaultPage from "../../../layout/DefaultPage";
import ActionButtons from "../../../components/ActionButtons";
import ListSearchForm from "../../../forms/SearchForm";
import BasicTable from "../../../components/Table";
import { config } from "./config";

const LeaveTypeList = () => {
    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <DefaultPage label="Leave Type List" bg>
            <ActionButtons label="Add Leave Type" />
            <ListSearchForm onSubmit={handleSubmit} />
            <BasicTable
                headerOptions={config.headerOptions}
                rowData={config.rows}
            />
        </DefaultPage>
    );
};

export default LeaveTypeList;
