import { useState } from "react";
import { IconButton } from "@mui/material";
import { NightlightOutlined, Nightlight } from "@mui/icons-material";

const NightMode = () => {
    const [mode, setMode] = useState<boolean>(false);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setMode(!mode);
    };

    return (
        <IconButton onClick={handleClick} size="small">
            {mode ? <Nightlight /> : <NightlightOutlined />}
        </IconButton>
    );
};

export default NightMode;
