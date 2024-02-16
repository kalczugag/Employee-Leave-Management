import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const RowActionButtons = () => {
    return (
        <div className="flex flex-row items-center justify-end space-x-2">
            <IconButton aria-label="edit" sx={{ padding: 0 }}>
                <Edit />
            </IconButton>
            <IconButton aria-label="edit" sx={{ padding: 0 }}>
                <Delete />
            </IconButton>
        </div>
    );
};

export default RowActionButtons;
