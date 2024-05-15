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
import ChartView from "./ChartView";

const Stats = () => {
    const { user } = useAuth();
    const { data, isLoading, stats, fullData } = useSelector(
        (state: RootState) => state.leave
    );

    const [doFetchLeaves] = useThunk(getLeaves);

    const options = {
        stats: true,
    };

    useEffect(() => {
        if (stats?.total === 0) {
            if (user?.roles !== "staff") {
                doFetchLeaves(options);
            } else if (user?.roles === "staff") {
                doFetchLeaves({ options, userId: user._id });
            }
        }
    }, []);

    return (
        <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
            {user?.roles !== "staff" ? (
                <>
                    <StatsViewBox
                        icon={<ContentPasteOutlined />}
                        amount={stats?.total}
                        label="Total Leave"
                        arrow={false}
                    />
                    <StatsViewBox
                        icon={<DisabledByDefaultOutlined />}
                        amount={stats?.rejected}
                        label="Rejected Leave"
                        variant="rejected"
                    />
                    <StatsViewBox
                        icon={<ThumbUpOutlined />}
                        amount={stats?.approved}
                        label="Approved Leave"
                        variant="approved"
                    />
                    <StatsViewBox
                        icon={<HourglassEmptyOutlined />}
                        amount={stats?.pending}
                        label="Pending Leave"
                        variant="pending"
                    />
                </>
            ) : (
                <ChartView data={stats} />
            )}
        </div>
    );
};

export default Stats;
