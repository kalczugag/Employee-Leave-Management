import AppsIcon from "@mui/icons-material/Apps";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import CustomIconButtom from "../customIconButton";

const ToolsMenu = () => {
    return (
        <>
            <CustomIconButtom>
                <NotificationsOutlinedIcon />
            </CustomIconButtom>
            <CustomIconButtom>
                <AppsIcon />
            </CustomIconButtom>
            <CustomIconButtom>
                <NightlightOutlinedIcon />
            </CustomIconButtom>
        </>
    );
};

export default ToolsMenu;
