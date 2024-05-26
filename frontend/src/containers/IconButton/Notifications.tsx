import { useState } from "react";
import { NotificationsOutlined } from "@mui/icons-material";
import { MenuItem, IconButton, Menu } from "@mui/material";

const options = [
    {
        label: "something...something...something...something...something...something...something...",
        date: "1 hour ago",
    },
    {
        label: "test...test...test...test...test...test...test...test...test...",
        date: "2 weeks ago",
    },
    {
        label: "something...something...something...something...something...something...something...",
        date: "2 weeks ago",
    },
    {
        label: "test...test...test...test...test...test...test...test...test...",
        date: "2 weeks ago",
    },
    {
        label: "something...something...something...something...something...something...something...",
        date: "3 weeks ago",
    },
    {
        label: "something...something...something...something...something...something...something...",
        date: "2 hours ago",
    },
    {
        label: "something...something...something...something...something...something...something...",
        date: "2 weeks ago",
    },
    { label: "test...test...test...test...test......", date: "2 weeks ago" },
    {
        label: "something...something...something...something...something...something...something...",
        date: "4 weeks ago",
    },
    {
        label: "something...something...something...something...something...something...something...",
        date: "2 weeks ago",
    },
    {
        label: "something...something...something...something...something...something...something...",
        date: "5 weeks ago",
    },
];

const Notifications = () => {
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
                aria-controls={open ? "Notifications" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >
                <NotificationsOutlined />
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
                <div className="flex flex-col p-1 pb-2 px-2 text-gray-500 border-b">
                    Notifications
                </div>
                {options.map((option, index) => (
                    <MenuItem
                        key={option.label + "_" + index}
                        onClick={handleClose}
                    >
                        <div className="flex flex-row items-center">
                            <img
                                src="/images/avatar.jpg"
                                alt="user"
                                className="w-16 h-16"
                            />
                            <div className="flex flex-col">
                                <div>{option.label}</div>
                                <div className="text-sm text-gray-500">
                                    {option.date}
                                </div>
                            </div>
                        </div>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default Notifications;
