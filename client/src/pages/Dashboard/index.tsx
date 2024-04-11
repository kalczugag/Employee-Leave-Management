import DefaultPage from "../../layout/DefaultPage";
import Stats from "../../components/Stats";
import SnackbarStatus from "../../components/SnackbarMsg";
import UsersList from "../../components/UsersList";

const Dashboard = () => {
    return (
        <DefaultPage label="Dashboard">
            <SnackbarStatus />
            <Stats />
            <UsersList>
                <UsersList.Hod />
                <UsersList.Staff />
            </UsersList>
        </DefaultPage>
    );
};

export default Dashboard;
