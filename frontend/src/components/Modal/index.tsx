import { ReactNode } from "react";
import { AppBar, Button, IconButton, Toolbar, Modal, Box } from "@mui/material";
import { Close } from "@mui/icons-material";

interface ModalProps {
    open: boolean;
    children: ReactNode;
    handleClose: () => void;
}

const style = {
    position: "absolute" as "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
};

const BasicModal = ({ open, children, handleClose }: ModalProps) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style} className="">
                <AppBar
                    sx={{
                        position: "relative",
                    }}
                >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <Close />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                {children}
            </Box>
        </Modal>
    );
};

export default BasicModal;
