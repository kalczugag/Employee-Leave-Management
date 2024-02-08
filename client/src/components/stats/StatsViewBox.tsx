interface Props {
    icon: JSX.Element;
    amount: number;
    label: string;
}

const StatsViewBox = ({ icon, amount, label }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 rounded bg-white shadow text-gray-500 md:p-10">
            <div>{icon}</div>
            <div className="text-lg font-bold">{amount}</div>
            <div className="text-center">{label}</div>
        </div>
    );
};

export default StatsViewBox;
