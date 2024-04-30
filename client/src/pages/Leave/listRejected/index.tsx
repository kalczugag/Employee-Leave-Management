import useExtendedLeaves from "../../../hooks/useExtendedLeaves";
import DefaultPage from "../../../layout/DefaultPage";
import ListSearchForm from "../../../forms/SearchForm";
import BasicTable from "../../../components/Table";
import { fields } from "../config";

const LeaveListRejected = () => {
    const data = useExtendedLeaves("rejected");

    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <DefaultPage label="Leave List Rejected" bg>
            <ListSearchForm data={[{ label: "x" }]} />
            <BasicTable headerOptions={fields} rowData={data || []} />
        </DefaultPage>
    );
};

export default LeaveListRejected;
