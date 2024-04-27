import React, { ReactNode, useState } from "react";
import { IconButton, MenuItem, Menu } from "@mui/material";

interface Props {
    children?: ReactNode;
    menuIcon: JSX.Element;
    label?: string;
    className?: string;
    options?: any[];
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

const CustomIconButton = ({
    children,
    label,
    menuIcon,
    className,
    handleOpen,
}: Props) => {
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
                {menuIcon}
            </IconButton>
            {!handleOpen && (
                <Menu
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
                    {label && (
                        <div className="flex flex-col p-1 pb-2 px-2 text-gray-500 border-b">
                            {label}
                        </div>
                    )}
                    {options.map((option) => (
                        <MenuItem key={option} onClick={handleClose}>
                            {option}
                            {children}
                        </MenuItem>
                    ))}
                </Menu>
            )}
        </div>
    );
};

export default CustomIconButton;
