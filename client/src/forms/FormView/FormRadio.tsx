import { Field } from "react-final-form";
import {
    FormControl,
    Radio,
    RadioGroup,
    FormLabel,
    FormControlLabel,
} from "@mui/material";

interface FormRadioProps {
    options: {
        label: string;
        name: string;
    };
    values: string[];
    required?: boolean;
    disabled?: boolean;
}

export const FormRadio = ({
    options,
    values,
    required,
    disabled,
}: FormRadioProps) => {
    return (
        <Field name={options.name} type="radio">
            {({ input, meta }) => (
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                        {options.label}
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={input.value || "pending"}
                        name="radio-buttons-group"
                        value={input.value}
                        onChange={input.onChange}
                    >
                        {values.map((option, index) => {
                            return (
                                <FormControlLabel
                                    key={`${option}_${index}`}
                                    value={option}
                                    control={<Radio />}
                                    label={option}
                                    required={required}
                                    disabled={disabled}
                                />
                            );
                        })}
                    </RadioGroup>
                </FormControl>
            )}
        </Field>
    );
};
