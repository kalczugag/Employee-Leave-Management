import { ArrowUpward } from "@mui/icons-material";

interface Props {
    icon: JSX.Element;
    amount: number;
    label: string;
    arrow?: boolean;
    variant?: "pending" | "approved" | "rejected";
}

const StatsViewBox = ({
    icon,
    amount = 0,
    label,
    arrow = true,
    variant = "pending",
}: Props) => {
    const arrowColor =
        variant === "pending"
            ? "orange"
            : variant === "approved"
            ? "green"
            : "red";

    return (
        <div className="flex flex-col items-center justify-center p-8 rounded bg-white shadow text-gray-500 md:p-10 md:py-14 md:text-lg">
            <div>{icon}</div>
            <div className="flex items-center text-2xl font-semibold">
                <span>{amount}</span>
                {arrow && <ArrowUpward sx={{ color: arrowColor }} />}
            </div>
            <div className="text-center">{label}</div>
        </div>
    );
};

export default StatsViewBox;
