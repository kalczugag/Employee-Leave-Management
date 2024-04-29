import { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { Apps as AppsIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

const options = [
    { label: "Department", to: "/department" },
    { label: "Leave Type", to: "/leave-type" },
    { label: "Employee", to: "/department" },
    { label: "Leave", to: "/leave" },
];

const Apps = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? "Apps" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >
                <AppsIcon />
            </IconButton>
            <Menu
                MenuListProps={{
                    "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        width: "40ch",
                        maxHeight: "80vh",
                    },
                }}
            >
                <div className="grid grid-cols-3">
                    {options.map(({ label, to }, index) => (
                        <MenuItem
                            key={label + "_" + index}
                            onClick={handleClick}
                        >
                            <div className="flex flex-col w-full items-center p-1 border">
                                <span>(icon)</span>
                                <Link to={to}>{label}</Link>
                            </div>
                        </MenuItem>
                    ))}
                </div>
            </Menu>
        </div>
    );
};

export default Apps;
