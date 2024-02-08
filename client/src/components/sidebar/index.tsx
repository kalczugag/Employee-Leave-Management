import CategoryList from "./CategoryList";

const Sidebar = () => {
    return (
        <div className="fixed top-20 bottom-0 left-0 hidden flex-col bg-white p-4 md:flex md:px-6">
            <CategoryList />
        </div>
    );
};

export default Sidebar;
