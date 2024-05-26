import { useNavigate } from "react-router-dom";
import { IconButton, Button } from "@mui/material";
import { SettingsOutlined, AddCircle } from "@mui/icons-material";
import { SiMicrosoftexcel } from "react-icons/si";
import { GrDocumentCsv } from "react-icons/gr";
import ListSearchForm from "../../forms/SearchForm";

interface Props {
    label: string;
    extended?: boolean;
}

const ActionButtons = ({ label, extended }: Props) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("../new");
    };

    return (
        <div className="flex flex-col-reverse items-center md:flex-row md:justify-between">
            {extended ? (
                <Button
                    onClick={handleNavigate}
                    variant="contained"
                    color="warning"
                    startIcon={<AddCircle />}
                >
                    {label}
                </Button>
            ) : (
                <ListSearchForm data={[{ label: "x" }]} />
            )}
            <div className="flex flex-row mb-4 space-x-2 md:mb-0">
                <IconButton aria-label="settings">
                    <SettingsOutlined />
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
