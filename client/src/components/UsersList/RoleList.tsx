import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState, getEmployees } from "../../store";
import useThunk from "../../hooks/useThunk";
import ProfileCell from "../ProfileCell";

const ONE_REQUEST_PAGES = ["/"];

const RoleList = ({ role }: { role: "hod" | "staff" }) => {
    const { pathname } = useLocation();
    const { data, isLoading } = useSelector(
        (state: RootState) => state.employee
    );

    const employeeData = useMemo(
        () => data.filter((e) => e.roles === role),
        [data]
    );

    const [doFetchEmployees] = useThunk(getEmployees);

    const isOneRequest = ONE_REQUEST_PAGES.some((page) =>
        pathname.includes(page)
    );

    useEffect(() => {
        if (data.length === 0 && !isLoading && !isOneRequest) {
            doFetchEmployees(role);
        }
    }, []);

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
