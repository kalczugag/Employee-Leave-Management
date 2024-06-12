import { ReactNode, forwardRef, useState } from "react";
import {
    Button,
    Dialog,
    ListItemText,
    ListItemButton,
    List,
    Divider,
    AppBar,
    Toolbar,
    Tooltip,
    IconButton,
    Typography,
    SvgIconTypeMap,
    Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Close, EmailOutlined } from "@mui/icons-material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface DialogProps {
    label: string;
    buttonIcon: JSX.Element;
    children?: ReactNode;
    fullScreen?: boolean;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = ({
    label,
    buttonIcon,
    children,
    fullScreen,
}: DialogProps) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Tooltip title="Send Email">
                <IconButton onClick={handleClickOpen}>{buttonIcon}</IconButton>
            </Tooltip>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                {children}
                <AppBar sx={{ position: "relative" }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <Close />
                        </IconButton>
                        <Typography
                            sx={{ ml: 2, flex: 1 }}
                            variant="h6"
                            component="div"
                        >
                            {label}
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItemButton>
                        <ListItemText
                            primary="Phone ringtone"
                            secondary="Titania"
                        />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                        <ListItemText
                            primary="Default notification ringtone"
                            secondary="Tethys"
                        />
                    </ListItemButton>
                </List>
            </Dialog>
        </>
    );
};

export default FullScreenDialog;
