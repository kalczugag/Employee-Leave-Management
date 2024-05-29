import BasicTable from "../../../components/Table";
import ListSearchForm from "../../../forms/SearchForm";
import useExtendedLeaves from "../../../hooks/useExtendedLeaves";
import DefaultPage from "../../../layout/DefaultPage";
import { fields } from "../config";

const LeaveListApproved = () => {
    const { data, isFetching } = useExtendedLeaves("approved");

    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <DefaultPage label="Leave List Approved" bg>
            <ListSearchForm data={[{ label: "x" }]} />
            <BasicTable
                headerOptions={fields}
                rowData={Array.isArray(data) ? data : []}
                isLoading={isFetching}
            />
        </DefaultPage>
    );
};

export default LeaveListApproved;
