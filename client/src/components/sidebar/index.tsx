import { useDispatch, useSelector } from "react-redux";
import { RootState, toggleSidebar } from "../../store";
import useMobileCheck from "../../hooks/useCheckMobileScreen";
import Drawer from "@mui/material/Drawer";
import CategoryList from "./CategoryList";

export default function TemporaryDrawer() {
    const dispatch = useDispatch();
    const isMobile = useMobileCheck();
    const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);

    return (
        <>
            {isMobile ? (
                <Drawer
                    anchor="left"
                    open={isOpen}
                    onClose={() => dispatch(toggleSidebar(false))}
                >
                    <CategoryList />
                </Drawer>
            ) : (
                <div className="fixed top-20 bottom-0 left-0 hidden flex-col bg-white p-4 md:flex md:px-6">
                    <CategoryList />
                </div>
            )}
        </>
    );
}
