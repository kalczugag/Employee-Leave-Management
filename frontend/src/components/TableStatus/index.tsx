interface Props {
    status: boolean;
}

const Status = ({ status }: Props) => {
    return (
        <span
            className={`${
                status ? "bg-green-600" : "bg-red-600"
            } rounded px-1 text-white font-semibold text-xs`}
        >
            {status ? "Active" : "Deactivated"}
        </span>
    );
};

export default Status;
