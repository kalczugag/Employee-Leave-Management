import { PieChart } from "@mui/x-charts/PieChart";

interface Props {
    data: {
        total: number;
        pending: number;
        approved: number;
        rejected: number;
    };
}

const ChartView = ({ data }: Props) => {
    return (
        <PieChart
            series={[
                {
                    data: [
                        { id: 1, value: data.pending, label: "Pending" },
                        { id: 2, value: data.approved, label: "Approved" },
                        { id: 2, value: data.rejected, label: "Rejected" },
                    ],
                },
            ]}
            width={400}
            height={200}
        />
    );
};

export default ChartView;
