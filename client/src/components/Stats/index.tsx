import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, getLeaves } from "../../store";
import useThunk from "../../hooks/useThunk";
import useAuth from "../../hooks/useAuth";
import {
    ContentPasteOutlined,
    DisabledByDefaultOutlined,
    ThumbUpOutlined,
    HourglassEmptyOutlined,
} from "@mui/icons-material";
import StatsViewBox from "./StatsViewBox";

const Stats = () => {
    const { user } = useAuth();
    const { data, isLoading, fullData } = useSelector(
        (state: RootState) => state.leave
    );

    const [doFetchLeaves] = useThunk(getLeaves);

    const leavesOptions = {
        selectQuery:
            "_id,createdAt,_user,leaveType,totalDay,startDate,endDate,updatedAt,__v",
    };

    const sortLeaves = () => {
        let total = 0,
            rejected = 0,
            approved = 0,
            pending = 0;

        if (data.length > 0) {
            data.map((val) => {
                total++;
                if (
                    val.hodStatus === "approved" ||
                    val.adminStatus === "approved"
                ) {
                    return approved++;
                } else if (
                    val.hodStatus === "pending" ||
                    val.adminStatus === "pending"
                ) {
                    return pending++;
                } else {
                    return rejected++;
                }
            });
        }

        return {
            total,
            rejected,
            approved,
            pending,
        };
    };

    useEffect(() => {
        if (
            (data.length === 0 || !fullData) &&
            (user?.roles.includes("admin") || user?.roles.includes("hod")) &&
            !isLoading
        ) {
            doFetchLeaves(leavesOptions);
        } else if (user) {
            doFetchLeaves({ ...leavesOptions, userId: user._id });
        }
    }, []);

    const { total, pending, approved, rejected } = sortLeaves();

    return (
        <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
            <StatsViewBox
                icon={<ContentPasteOutlined />}
                amount={total}
                label="Total Leave"
                arrow={false}
            />
            <StatsViewBox
                icon={<DisabledByDefaultOutlined />}
                amount={rejected}
                label="Rejected Leave"
                variant="rejected"
            />
            <StatsViewBox
                icon={<ThumbUpOutlined />}
                amount={approved}
                label="Approved Leave"
                variant="approved"
            />
            <StatsViewBox
                icon={<HourglassEmptyOutlined />}
                amount={pending}
                label="Pending Leave"
                variant="pending"
            />
        </div>
    );
};

export default Stats;
