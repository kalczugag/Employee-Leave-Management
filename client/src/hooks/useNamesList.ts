import { useSelector } from "react-redux";
import { RootState, getDepartments, getLeaveTypes } from "../store";
import useThunk from "./useThunk";
import { useEffect } from "react";

const useNamesList = (type: "department" | "leaveType") => {
    const [doFetchOption, isFetchingList] = useThunk(
        type === "department" ? getDepartments : getLeaveTypes
    );

    const data = useSelector((state: RootState) => state[type].data);

    const namesList: string[] = data
        .map((e) => (e.name && e.active ? e.name : ""))
        .filter((n) => n !== "");

    const selectQuery = "shortName,details,status,createdAt,updatedAt,__v";

    useEffect(() => {
        if (data.length === 0 && !isFetchingList) doFetchOption(selectQuery);
    }, []);

    return { namesList, isFetchingList };
};

export default useNamesList;
