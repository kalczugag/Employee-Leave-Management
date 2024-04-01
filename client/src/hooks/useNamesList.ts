import { useSelector } from "react-redux";
import { RootState, getDepartments } from "../store";
import useThunk from "./useThunk";
import { useEffect } from "react";

const useNamesList = (type: "department" | "leaveType") => {
    const [doFetchDepartments, isFetchingList] = useThunk(getDepartments);

    const data = useSelector((state: RootState) => state[type].data);

    const namesList: string[] = data.map((e) => e.name);

    const selectQuery = "shortName,details,status,createdAt,updatedAt,__v";

    useEffect(() => {
        if (data.length === 0 && !isFetchingList)
            doFetchDepartments(selectQuery);
    }, []);

    return { namesList, isFetchingList };
};

export default useNamesList;
