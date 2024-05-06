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
    const { data, isLoading, fullData } = useSelector(
        (state: RootState) => state.leave
    );

    const [doFetchLeaves] = useThunk(getLeaves);

    const options = { stats: true };

    useEffect(() => {
        if (
            (data.length === 0 || !fullData) &&
            user?.roles !== "staff" &&
            !isLoading
        ) {
            doFetchLeaves(options);
        } else if (user && user?.roles === "staff") {
            doFetchLeaves({ options, userId: user._id });
        }
    }, []);

    const total = 0,
        pending = 0,
        rejected = 0,
        approved = 0;

    return (
        <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
            {!user?.roles.includes("staff") ? (
                <>
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
                </>
            ) : (
                <ChartView data={{ total, pending, approved, rejected }} />
            )}
        </div>
    );
};

export default Stats;
