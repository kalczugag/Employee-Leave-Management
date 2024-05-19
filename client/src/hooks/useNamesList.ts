import { useSelector } from "react-redux";
import { useGetAllDepartmentsQuery, RootState } from "../store";

const useNamesListDepartment = () => {
    const { data } = useGetAllDepartmentsQuery(
        "shortName,details,status,createdAt,updatedAt,__v"
    );

    if (!data) {
        return [];
    }

    const namesList: string[] = data
        .map((e) => (e.name && e.active ? e.name : ""))
        .filter((n) => n !== "");

    return namesList;
};

const useNamesListLeaveType = () => {
    const data = useSelector((state: RootState) => state.leaveType.data);

    if (!data) {
        return [];
    }

    const namesList: string[] = data
        .map((e) => (e.name && e.active ? e.name : ""))
        .filter((n) => n !== "");

    return namesList;
};

export { useNamesListDepartment, useNamesListLeaveType };
