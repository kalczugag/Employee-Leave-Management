import DefaultPage from "../../layout/DefaultPage";
import Stats from "../../components/Stats1";

const Dashboard = () => {
    return (
        <DefaultPage label="Dashboard">
            <Stats />
            <div className="flex flex-row justify-between space-x-6 text-gray-500">
                <div className="flex-1 p-6 rounded bg-white shadow">
                    <h3>Department Head</h3>
                </div>
                <div className="flex-1 p-6 rounded bg-white shadow">
                    <h3>Department Head</h3>
                </div>
            </div>
        </DefaultPage>
    );
};

export default Dashboard;
