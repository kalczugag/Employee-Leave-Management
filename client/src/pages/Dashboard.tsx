import Stats from "../components/stats";
import CopyrightsFooter from "../components/footer";

const Dashboard = () => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 flex flex-col space-y-6">
                <h3 className="font-semibold text-gray-500">Dashboard</h3>
                <Stats />
                <div className="flex flex-row justify-between space-x-6 text-gray-500">
                    <div className="flex-1 p-6 rounded bg-white">
                        <h3>Department Head</h3>
                    </div>
                    <div className="flex-1 p-6 rounded bg-white">
                        <h3>Department Head</h3>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between text-sm text-gray-500 border-t md:flex-row">
                <div>
                    <CopyrightsFooter />
                </div>
                <div className="flex flex-row items-end space-x-4">
                    <a href="#">About</a>
                    <a href="#">Support</a>
                    <a href="#">Contact Us</a>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
