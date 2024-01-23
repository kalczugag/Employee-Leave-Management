type Props = {
    primary?: boolean;
};

const Logo = ({ primary = false }: Props) => {
    const color = primary ? "bg-blue-500 text-white" : "bg-white text-black";
    const firstBall = primary ? "bg-cyan-500" : "bg-blue-500";
    const secondBall = primary ? "bg-white" : "bg-gray-700";

    return (
        <div
            className={`flex items-center justify-center space-x-6 p-4 font-serif ${color}`}
        >
            <div className="relative flex items-center">
                <div
                    className={`absolute w-5 h-5 rounded-full z-10 ${firstBall}`}
                />
                <div
                    className={`absolute -left-3 w-5 h-5 rounded-full ${secondBall}`}
                />
            </div>
            <h1 className="text-2xl">INVENTORY</h1>
        </div>
    );
};

export default Logo;
