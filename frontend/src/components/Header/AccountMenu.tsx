import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { AppDispatch, logout } from "../../store";
import useSnackbar from "../../hooks/useSnackbar";
import {
    Box,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
    IconButton,
    Tooltip,
} from "@mui/material";
import { Settings, Logout } from "@mui/icons-material";
import ToolsMenu from "./ToolsMenu";

const AccountMenu = () => {
    const { handleOpen } = useSnackbar();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout())
            .unwrap()
            .catch((err) => console.error(err))
            .finally(() => {
                handleOpen("Logged out", "error");
                window.location.reload();
            });
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <ToolsMenu />
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2, borderRadius: 0 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <div className="flex flex-row items-center space-x-2">
                            <Avatar
                                sx={{ width: 32, height: 32 }}
                                src={user?.img && user.img}
                            >
                                {!user?.img && user?.firstName[0].toUpperCase()}
                            </Avatar>
                            <div className="hidden flex-col items-start text-sm text-gray-500 font-semibold md:flex">
                                <p>
                                    {user?.firstName} {user?.lastName}
                                </p>
                                <p>{user?.roles.toUpperCase()}</p>
                            </div>
                        </div>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem
                    onClick={() => {
                        handleClose();
                        navigate(`/profile/${user?._id}`);
                    }}
                >
                    <Avatar /> Profile
                </MenuItem>
                <Divider sx={{ width: "215px" }} />
                <MenuItem
                    onClick={() => {
                        handleClose();
                        navigate("/settings");
                    }}
                >
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        handleLogout();
                    }}
                >
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default AccountMenu;
