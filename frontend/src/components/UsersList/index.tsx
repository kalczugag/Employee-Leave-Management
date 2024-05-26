import { ReactNode } from "react";
import { useGetEmployeesQuery } from "../../store";
import RoleList from "./RoleList";

interface Props {
    children: ReactNode;
}

const UsersList = ({ children }: Props) => {
    useGetEmployeesQuery("staff,hod");

    return (
        <div className="flex flex-col justify-between space-y-4 text-gray-500 lg:flex-row lg:space-x-6 lg:space-y-0">
            {children}
        </div>
    );
};

UsersList.Hod = () => <RoleList role="hod" />;
UsersList.Staff = () => <RoleList role="staff" />;

export default UsersList;
