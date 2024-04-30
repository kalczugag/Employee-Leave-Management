import BasicTable from "../../../components/Table";
import ListSearchForm from "../../../forms/SearchForm";
import useExtendedLeaves from "../../../hooks/useExtendedLeaves";
import DefaultPage from "../../../layout/DefaultPage";
import { fields } from "../config";

const LeaveList = () => {
    const data = useExtendedLeaves();

    const handleSubmit = (values: any) => {
        console.log(values);
    };

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
            <BasicTable headerOptions={fields} rowData={data || []} />
        </DefaultPage>
    );
};
export default LeaveList;
