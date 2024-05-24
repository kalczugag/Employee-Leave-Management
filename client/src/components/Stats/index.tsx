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

const Stats = () => {
    const { user } = useAuth();

    const options = {
        stats: true,
        ...(user?.roles === "staff" && { userId: user._id }),
    };

    const { data } = useGetLeavesQuery(options);

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
            ) : (
                LeavesType.isStatsData(data) && <ChartView data={data} />
            )}
        </div>
    );
};

export default Stats;
