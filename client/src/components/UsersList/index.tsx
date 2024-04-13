import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, getEmployees } from "../../store";
import useThunk from "../../hooks/useThunk";
import RoleList from "./RoleList";

interface Props {
    children: ReactNode;
}

const UsersList = ({ children }: Props) => {
    const { data, isLoading } = useSelector(
        (state: RootState) => state.employee
    );

    const [doFetchEmployees] = useThunk(getEmployees);

    useEffect(() => {
        if (data.length === 0 && !isLoading) {
            doFetchEmployees("staff,hod");
        }
    }, []);

    return (
        <div className="flex flex-col justify-between space-y-4 text-gray-500 lg:flex-row lg:space-x-6 lg:space-y-0">
            {children}
        </div>
    );
};

UsersList.Hod = () => <RoleList role="hod" />;
UsersList.Staff = () => <RoleList role="staff" />;

export default UsersList;
