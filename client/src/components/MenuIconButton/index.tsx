import React, { ReactNode, useState } from "react";
import { IconButton, MenuItem, Menu } from "@mui/material";

interface Props {
    children: ReactNode;
    options?: any[]; //change to required
    className?: string;
    handleOpen?: () => void;
}

const options = [
    "None",
    "Atria",
    "Callisto",
    "Dione",
    "Ganymede",
    "Hangouts Call",
    "Luna",
    "Oberon",
    "Phobos",
    "Pyxis",
    "Sedna",
    "Titania",
    "Triton",
    "Umbriel",
];

const CustomIconButtom = ({ children, handleOpen, className }: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);

        if (handleOpen) {
            handleOpen();
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={className}>
            <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >
                {children}
            </IconButton>
            {!handleOpen && (
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            width: "20ch",
                        },
                    }}
                >
                    {options.map((option) => (
                        <MenuItem key={option} onClick={handleClose}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            )}
        </div>
    );
};

export default CustomIconButtom;
