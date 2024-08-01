const NotFound = () => {
    return (
        <div className="col-span-2 md:col-span-4 flex flex-col justify-center items-center mt-14">
            <img
                src="/images/no_data.png"
                alt="no data icon"
                className="w-24"
            />
            <div className="font-bold text-gray-500">Data not found</div>
        </div>
    );
};

export default NotFound;
