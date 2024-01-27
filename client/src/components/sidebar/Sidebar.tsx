import LinksList from "./LinksList";

const Sidebar = () => {
    return (
        <div className="fixed top-20 bottom-0 left-0 flex flex-col bg-white space-y-6 p-4 px-6">
            <LinksList />
        </div>
    );
};

export default Sidebar;
