import BasicTable from "../../../components/Table";
import ListSearchForm from "../../../forms/SearchForm";
import useExtendedLeaves from "../../../hooks/useExtendedLeaves";
import DefaultPage from "../../../layout/DefaultPage";
import { fields } from "../config";

const LeaveListPending = () => {
    const data = useExtendedLeaves({ status: "pending" });
    console.log(data);

    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <DefaultPage label="Leave List Pending" bg>
            <ListSearchForm onSubmit={handleSubmit} />
            <BasicTable headerOptions={fields} rowData={data || []} />
        </DefaultPage>
    );
};

export default LeaveListPending;
