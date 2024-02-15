import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import StatsViewBox from "./StatsViewBox";

const Stats = () => {
    return (
        <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
            <StatsViewBox
                icon={<ContentPasteOutlinedIcon />}
                amount={5}
                label="Total Leave"
            />
            <StatsViewBox
                icon={<DisabledByDefaultOutlinedIcon />}
                amount={3}
                label="Rejected Leave"
            />
            <StatsViewBox
                icon={<ThumbUpOutlinedIcon />}
                amount={1}
                label="Approved Leave"
            />
            <StatsViewBox
                icon={<HourglassEmptyOutlinedIcon />}
                amount={1}
                label="Pending Leave"
            />
        </div>
    );
};

export default Stats;
