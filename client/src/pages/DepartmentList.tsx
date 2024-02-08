import DefaultPage from "../layout/DefaultPage";
import ActionButtons from "../components/ActionButtons";

const DepartmentList = () => {
    return (
        <DefaultPage label="Department List">
            <div className="bg-white p-4 rounded">
                <ActionButtons label="Add Department" />
            </div>
        </DefaultPage>
    );
};

export default DepartmentList;
