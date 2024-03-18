import { Field } from "react-final-form";
import { TextField } from "@mui/material";

interface FormFieldProps {
    options: {
        label: string;
        name: string;
    };
    required?: boolean;
    disabled?: boolean;
}

export const FormField = ({ options, required, disabled }: FormFieldProps) => {
    return (
        <Field name={options.name}>
            {({ input, meta }) => (
                <div className="space-y-1">
                    <label htmlFor={input.name}>{options.label}</label>
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
                        disabled={disabled}
                        required={required}
                        fullWidth
                    />
                </div>
            )}
        </Field>
    );
};
