import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, getEmployees } from "../../store";
import useThunk from "../../hooks/useThunk";
import ProfileCell from "../ProfileCell";

const StaffList = () => {
    const role = "staff";
    const { data, isLoading } = useSelector((state: RootState) => {
        const users = state.employee.data.filter((e) => e.roles === role);

        return {
            data: users,
            isLoading: state.employee.isLoading,
        };
    });

    const [doFetchEmployees] = useThunk(getEmployees);

    useEffect(() => {
        if (data.length === 0 && !isLoading) {
            doFetchEmployees(role);
        }
    }, []);

    return (
        <div className="flex-1 p-6 rounded space-y-4 bg-white shadow">
            <h3>Staff List</h3>
            {data.map((user, index) => {
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

export default StaffList;
