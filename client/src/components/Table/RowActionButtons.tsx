import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const RowActionButtons = () => {
    return (
        <div className="flex flex-row items-center justify-end space-x-2">
            <IconButton aria-label="edit" sx={{ padding: 0 }}>
                <EditIcon />
            </IconButton>
            <IconButton aria-label="edit" sx={{ padding: 0 }}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
};

export default RowActionButtons;
