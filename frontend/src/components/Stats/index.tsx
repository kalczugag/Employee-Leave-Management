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

interface QueryError {
    data?: {
        msg?: string;
    };
}

const Stats = () => {
    const { user } = useAuth();

    const options = {
        stats: true,
        ...(user?.roles === "staff" && { userId: user._id }),
    };

    const { data, error } = useGetLeavesQuery(options);

    return (
        <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
            {user?.roles !== "staff" && LeavesType.isStatsData(data) ? (
                <>
                    <StatsViewBox
                        icon={<ContentPasteOutlined />}
                        amount={data.total}
                        label="Total Leave"
                        arrow={false}
                    />
                    <StatsViewBox
                        icon={<DisabledByDefaultOutlined />}
                        amount={data.rejected}
                        label="Rejected Leave"
                        variant="rejected"
                    />
                    <StatsViewBox
                        icon={<ThumbUpOutlined />}
                        amount={data.approved}
                        label="Approved Leave"
                        variant="approved"
                    />
                    <StatsViewBox
                        icon={<HourglassEmptyOutlined />}
                        amount={data.pending}
                        label="Pending Leave"
                        variant="pending"
                    />
                </>
            ) : LeavesType.isStatsData(data) && !error ? (
                <ChartView data={data} />
            ) : (
                <div className="col-span-2 md:col-span-4 flex flex-col justify-center items-center h-full">
                    <img
                        src="/images/no_data.png"
                        alt="no data icon"
                        className="w-24"
                    />
                    <div className="font-bold text-gray-500">
                        No chart data available
                    </div>
                </div>
            )}
        </div>
    );
};

export default Stats;
