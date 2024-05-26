import { useGetAllDepartmentsQuery, useGetLeaveTypesQuery } from "../store";

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
    const { data } = useGetLeaveTypesQuery(
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

export { useNamesListDepartment, useNamesListLeaveType };
