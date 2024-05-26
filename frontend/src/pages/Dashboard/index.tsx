import useAuth from "../../hooks/useAuth";
import DefaultPage from "../../layout/DefaultPage";
import Stats from "../../components/Stats";
import SnackbarStatus from "../../components/SnackbarMsg";
import UsersList from "../../components/UsersList";

const Dashboard = () => {
    const { user } = useAuth();

    const isAdmin = !user?.roles.includes("staff");

    return (
        <DefaultPage label="Dashboard" bg={isAdmin ? false : true}>
            <SnackbarStatus />
            <Stats />
            {isAdmin && (
                <UsersList>
                    <UsersList.Hod />
                    <UsersList.Staff />
                </UsersList>
            )}
        </DefaultPage>
    );
};

export default Dashboard;
