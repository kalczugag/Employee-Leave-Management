import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { SiMicrosoftexcel } from "react-icons/si";
import { GrDocumentCsv } from "react-icons/gr";

interface Props {
    label: string;
}

const ActionButtons = ({ label }: Props) => {
    return (
        <div className="flex flex-row justify-between">
            <Button
                variant="contained"
                color="warning"
                startIcon={<AddCircleIcon />}
            >
                {label}
            </Button>
            <div className="flex flex-row space-x-2">
                <IconButton size="small" aria-label="settings">
                    <SettingsOutlinedIcon />
                </IconButton>
                <Button
                    size="small"
                    variant="contained"
                    color="inherit"
                    startIcon={<SiMicrosoftexcel />}
                >
                    Export
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    color="inherit"
                    startIcon={<GrDocumentCsv />}
                >
                    Export
                </Button>
            </div>
        </div>
    );
};

export default ActionButtons;
