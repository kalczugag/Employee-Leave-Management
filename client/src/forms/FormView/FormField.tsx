import { Field } from "react-final-form";
import { TextField, InputLabel } from "@mui/material";

interface FormFieldProps {
    options: {
        label: string;
        name: string;
    };
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
}

export const FormField = ({
    options,
    placeholder,
    required,
    disabled,
}: FormFieldProps) => {
    return (
        <Field name={options.name}>
            {({ input, meta }) => (
                <div className="space-y-1">
                    <InputLabel>{options.label}</InputLabel>
                    <TextField
                        variant="outlined"
                        name={input.name}
                        value={input.value}
                        onChange={input.onChange}
                        inputProps={{
                            style: {
                                padding: 10,
                            },
                        }}
                        autoComplete="off"
                        placeholder={placeholder}
                        disabled={disabled}
                        required={required}
                        fullWidth
                    />
                </div>
            )}
        </Field>
    );
};
