import { InputLabel, MenuItem, Select } from "@mui/material";
import { Field } from "react-final-form";

interface FormSelectProps {
    options: {
        label: string;
        name: string;
    };
    values: string[];
    required?: boolean;
    disabled?: boolean;
}

export const FormSelect = ({
    options,
    values,
    required,
    disabled,
}: FormSelectProps) => {
    return (
        <Field name={options.name}>
            {({ input, meta }) => (
                <div className="space-y-1">
                    <InputLabel>{options.label}</InputLabel>
                    <Select
                        sx={{ height: "43px" }}
                        value={input.value}
                        onChange={input.onChange}
                        required={required}
                        disabled={disabled}
                        fullWidth
                    >
                        {values.map((option, index) => {
                            return (
                                <MenuItem
                                    key={`${option}_${index}`}
                                    value={option}
                                >
                                    {option}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </div>
            )}
        </Field>
    );
};
