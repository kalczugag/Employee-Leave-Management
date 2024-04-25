import {
    Apps,
    NightlightOutlined,
    NotificationsOutlined,
} from "@mui/icons-material";
import IconButton from "../IconButton";

const ToolsMenu = () => {
    return (
        <>
            <IconButton>
                <NotificationsOutlined />
            </IconButton>
            <IconButton>
                <Apps />
            </IconButton>
            <IconButton>
                <NightlightOutlined />
            </IconButton>
        </>
    );
};

export default ToolsMenu;
