import { ReactNode } from "react";
import { useGetEmployeesQuery } from "../../store";
import RoleList from "./RoleList";

interface Props {
    children: ReactNode;
}

const UsersList = ({ children }: Props) => {
    useGetEmployeesQuery({ byRole: "staff,hod" });

    return (
        <div className="flex flex-col justify-between space-y-4 h-full text-gray-500 xl:flex-row xl:space-x-6 xl:space-y-0">
            {children}
        </div>
    );
};

UsersList.Hod = () => <RoleList role="hod" />;
UsersList.Staff = () => <RoleList role="staff" />;

export default UsersList;
