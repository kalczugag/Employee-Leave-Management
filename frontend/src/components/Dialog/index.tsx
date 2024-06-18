import { ReactNode, forwardRef, useState } from "react";
import {
    Dialog,
    Tooltip,
    IconButton,
    Slide,
    AppBar,
    Typography,
    Button,
    Toolbar,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { TransitionProps } from "@mui/material/transitions";

interface DialogProps {
    label: string;
    buttonIcon: JSX.Element;
    children?: ReactNode;
    fullScreen?: boolean;
    onSubmit?: () => void;
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
    onSubmit,
}: DialogProps) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit();
        }
        handleClose();
    };

    return (
        <div>
            <Tooltip title="Send Email">
                <IconButton onClick={handleClickOpen}>{buttonIcon}</IconButton>
            </Tooltip>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
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
                            Send Email
                        </Typography>
                        <Button
                            autoFocus
                            color="inherit"
                            onClick={handleSubmit}
                        >
                            send
                        </Button>
                    </Toolbar>
                </AppBar>
                {children}
            </Dialog>
        </div>
    );
};

export default FullScreenDialog;
