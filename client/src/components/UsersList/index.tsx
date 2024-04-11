import { ReactNode } from "react";
import HodList from "./HodList";
import StaffList from "./StaffList";

interface Props {
    children: ReactNode;
}

const UsersList = ({ children }: Props) => {
    return (
        <div className="flex flex-col justify-between space-y-4 text-gray-500 lg:flex-row lg:space-x-6 lg:space-y-0">
            {children}
        </div>
    );
};

UsersList.Hod = HodList;
UsersList.Staff = StaffList;

export default UsersList;
