import {
    ContentPasteOutlined,
    DisabledByDefaultOutlined,
    ThumbUpOutlined,
    HourglassEmptyOutlined,
} from "@mui/icons-material";
import StatsViewBox from "./StatsViewBox";

const Stats = () => {
    return (
        <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
            <StatsViewBox
                icon={<ContentPasteOutlined />}
                amount={5}
                label="Total Leave"
            />
            <StatsViewBox
                icon={<DisabledByDefaultOutlined />}
                amount={3}
                label="Rejected Leave"
            />
            <StatsViewBox
                icon={<ThumbUpOutlined />}
                amount={1}
                label="Approved Leave"
            />
            <StatsViewBox
                icon={<HourglassEmptyOutlined />}
                amount={1}
                label="Pending Leave"
            />
        </div>
    );
};

export default Stats;
