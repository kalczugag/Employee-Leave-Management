import { Link } from "react-router-dom";

const ProfileCell = (props: { data: user }) => {
    const { img, firstName, lastName, email, _id } = props.data;

    return (
        <Link
            to={`/profile/${_id}`}
            className="flex flex-row items-center space-x-4 py-1 border-b hover:bg-gray-200"
        >
            <div className="w-[120px] h-[60px]">
                <img
                    src={img}
                    alt="img"
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="flex flex-col">
                <span className="font-semibold text-gray-600">
                    {firstName} {lastName}
                </span>
                <span>{email}</span>
            </div>
        </Link>
    );
};

export default ProfileCell;
