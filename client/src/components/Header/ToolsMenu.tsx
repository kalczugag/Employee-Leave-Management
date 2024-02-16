import {
    Apps,
    NightlightOutlined,
    NotificationsOutlined,
} from "@mui/icons-material";
import CustomIconButtom from "../MenuIconButton";

const ToolsMenu = () => {
    return (
        <>
            <CustomIconButtom>
                <NotificationsOutlined />
            </CustomIconButtom>
            <CustomIconButtom>
                <Apps />
            </CustomIconButtom>
            <CustomIconButtom>
                <NightlightOutlined />
            </CustomIconButtom>
        </>
    );
};

export default ToolsMenu;
