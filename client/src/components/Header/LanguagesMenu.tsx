import { useState } from "react";
import {
    InputLabel,
    MenuItem,
    FormControl,
    SelectChangeEvent,
    Select,
} from "@mui/material";

export default function SelectSmall() {
    const [language, setlanguage] = useState<string>("");

    const handleChange = (event: SelectChangeEvent) => {
        setlanguage(event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="select-language-label">Language</InputLabel>
            <Select
                labelId="select-language-label"
                id="select-language"
                defaultValue="english"
                label="Language"
                onChange={handleChange}
            >
                <MenuItem value="english" selected>
                    English
                </MenuItem>
                <MenuItem value="polish">Polish</MenuItem>
            </Select>
        </FormControl>
    );
}
