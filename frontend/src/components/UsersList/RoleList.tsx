import { useGetEmployeesQuery } from "../../store";
import ProfileCell from "../ProfileCell";

const RoleList = ({ role }: { role: "hod" | "staff" }) => {
    const { data, isLoading } = useGetEmployeesQuery({ byRole: "staff,hod" });

    if (!data && !isLoading) {
        return null;
    }

    if (!Array.isArray(data?.users)) {
        return <></>;
    }

    const employeeData = data!.users.filter((e) => e.roles === role);

    return (
        <div className="flex-1 p-6 rounded space-y-2 bg-white shadow">
            <h3>{role === "hod" ? "Department Head" : "Staff List"}</h3>
            {employeeData.map((user, index) => {
                return (
                    <ProfileCell
                        key={user.firstName + "_" + index.toString()}
                        data={user}
                    />
                );
            })}
        </div>
    );
};

export default RoleList;
