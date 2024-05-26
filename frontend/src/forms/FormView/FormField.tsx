import { Field } from "react-final-form";
import { TextField, InputLabel } from "@mui/material";

interface FormFieldProps {
    options: {
        label: string;
        name: string;
    };
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
    required?: boolean;
    disabled?: boolean;
}

export const FormField = ({
    options,
    placeholder,
    type = "text",
    required,
    disabled,
}: FormFieldProps) => {
    return (
        <Field name={options.name} type={type}>
            {({ input, meta }) => (
                <div className="space-y-1">
                    <InputLabel>{options.label}</InputLabel>
                    <TextField
                        type={type}
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
