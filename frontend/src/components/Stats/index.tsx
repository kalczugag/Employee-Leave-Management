import { useGetLeavesQuery } from "../../store";
import LeavesType from "../../utils/leavesType";
import useAuth from "../../hooks/useAuth";
import {
    ContentPasteOutlined,
    DisabledByDefaultOutlined,
    ThumbUpOutlined,
    HourglassEmptyOutlined,
} from "@mui/icons-material";
import ChartView from "./ChartView";
import StatsViewBox from "./StatsViewBox";
import { Skeleton } from "@mui/material";

const Stats = () => {
    const { user } = useAuth();

    const options = {
        stats: true,
        ...(user?.roles === "staff" && { userId: user._id }),
    };

    const { data, isLoading, error } = useGetLeavesQuery(options);
    const statsData = LeavesType.isStatsData(data) ? data : null;

    if (isLoading) {
        return (
            <>
                {user?.roles !== "staff" ? (
                    <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
                        <Skeleton variant="rectangular" height={180} />
                        <Skeleton variant="rectangular" height={180} />
                        <Skeleton variant="rectangular" height={180} />
                        <Skeleton variant="rectangular" height={180} />
                    </div>
                ) : (
                    <div className="flex flex-row  space-x-4 ">
                        <Skeleton variant="circular" width={200} height={200} />
                        <div className="flex flex-col justify-center">
                            <Skeleton variant="text" width={150} />
                            <Skeleton variant="text" width={150} />
                            <Skeleton variant="text" width={150} />
                        </div>
                    </div>
                )}
            </>
        );
    }

    if (error || (!statsData && user?.roles === "staff")) {
        return (
            <div className="col-span-2 md:col-span-4 flex flex-col justify-center items-center h-full">
                <img
                    src="/images/no_data.png"
                    alt="no data icon"
                    className="w-24"
                />
                <div className="font-bold text-gray-500">
                    Failed to load data
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
            {user?.roles !== "staff" && statsData ? (
                <>
                    <StatsViewBox
                        icon={<ContentPasteOutlined />}
                        amount={statsData.total}
                        label="Total Leave"
                        arrow={false}
                    />
                    <StatsViewBox
                        icon={<DisabledByDefaultOutlined />}
                        amount={statsData.rejected}
                        label="Rejected Leave"
                        variant="rejected"
                    />
                    <StatsViewBox
                        icon={<ThumbUpOutlined />}
                        amount={statsData.approved}
                        label="Approved Leave"
                        variant="approved"
                    />
                    <StatsViewBox
                        icon={<HourglassEmptyOutlined />}
                        amount={statsData.pending}
                        label="Pending Leave"
                        variant="pending"
                    />
                </>
            ) : (
                statsData && <ChartView data={statsData} />
            )}
        </div>
    );
};

export default Stats;
