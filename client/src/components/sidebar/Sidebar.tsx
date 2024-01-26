import LinksList from "./LinksList";

const Sidebar = () => {
    return (
        <div className="fixed top-20 bottom-0 left-0 flex flex-col bg-white space-y-6 p-4 pl-12 pr-6">
            <h5 className="text-xs font-semibold text-gray-500">
                ADMIN ROUTES
            </h5>
            <LinksList />
        </div>
    );
};

export default Sidebar;
