import { Apps, NightlightOutlined } from "@mui/icons-material";
import IconButton from "../IconButton";
import Notifications from "../../containers/IconButtons/Notifications";

const ToolsMenu = () => {
    return (
        <>
            <Notifications />
            <IconButton menuIcon={<Apps />}>x</IconButton>
            <IconButton menuIcon={<NightlightOutlined />}>x</IconButton>
        </>
    );
};

export default ToolsMenu;
