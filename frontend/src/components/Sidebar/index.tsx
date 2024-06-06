import { useDispatch, useSelector } from "react-redux";
import { RootState, toggleSidebar } from "../../store";
import useMobileCheck from "../../hooks/useCheckMobileScreen";
import { Drawer } from "@mui/material";
import CategoryList from "./CategoryList";
import Logo from "../Logo";

export default function Sidebar() {
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
                    <div className="flex flex-col space-y-4 px-2">
                        <Logo />
                        <CategoryList />
                    </div>
                </Drawer>
            ) : (
                <div className="fixed top-20 bottom-0 left-0 hidden flex-col bg-white p-4 md:flex">
                    <CategoryList />
                </div>
            )}
        </>
    );
}
