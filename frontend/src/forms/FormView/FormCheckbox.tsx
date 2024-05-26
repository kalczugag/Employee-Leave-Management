import { Field } from "react-final-form";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

interface FormCheckboxProps {
    options:
        | {
              label: string;
              name: string;
          }
        | {
              label: string;
              name: string;
          }[];
    required?: boolean;
    disabled?: boolean;
}

export const FormCheckbox = ({
    options,
    required,
    disabled,
}: FormCheckboxProps) => {
    if (Array.isArray(options)) {
        return (
            <FormGroup>
                {options.map((itemOptions, index) => (
                    <Field
                        name={itemOptions.name}
                        type="checkbox"
                        key={`${itemOptions.name}_${index}`}
                    >
                        {({ input, meta }) => (
                            <FormControlLabel
                                key={itemOptions.name + "_" + index.toString()}
                                control={
                                    <Checkbox
                                        checked={input.checked}
                                        onChange={input.onChange}
                                        name={input.name}
                                        disabled={disabled}
                                        required={required}
                                    />
                                }
                                label={itemOptions.label}
                            />
                        )}
                    </Field>
                ))}
            </FormGroup>
        );
    }

    return (
        <Field name={options.name} type="checkbox">
            {({ input, meta }) => (
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={input.checked}
                            onChange={input.onChange}
                            name={input.name}
                            disabled={disabled}
                            required={required}
                        />
                    }
                    label={options.label}
                />
            )}
        </Field>
    );
};
