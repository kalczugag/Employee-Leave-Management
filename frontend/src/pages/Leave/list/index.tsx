import _ from "lodash";
import { fields } from "../config";
import useExtendedLeaves from "../../../hooks/useExtendedLeaves";
import ListSearchForm from "../../../forms/SearchForm";
import DefaultPage from "../../../layout/DefaultPage";
import BasicTable from "../../../components/Table";

const LeaveList = () => {
    const { data, isFetching, total } = useExtendedLeaves();

    const dd = [
        { label: "1" },
        { label: "2" },
        { label: "3" },
        { label: "4" },
        { label: "5" },
        { label: "6" },
        { label: "7" },
        { label: "8" },
        { label: "9" },
    ];

    return (
        <DefaultPage label="Leave List" bg>
            <ListSearchForm data={dd} />
            <BasicTable
                headerOptions={fields}
                rowData={Array.isArray(data) ? data : []}
                totalItems={total}
                isLoading={isFetching}
            />
        </DefaultPage>
    );
};
export default LeaveList;
