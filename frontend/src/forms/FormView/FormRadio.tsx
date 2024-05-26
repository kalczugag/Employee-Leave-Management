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
        <FormControl>
            <FormLabel id="radio-buttons-group-label">
                {options.label}
            </FormLabel>
            <RadioGroup aria-labelledby="radio-buttons-group-label">
                {values.map((option, index) => {
                    return (
                        <Field
                            name={options.name}
                            type="radio"
                            key={`${option}_${index}`}
                        >
                            {({ input, meta }) => (
                                <FormControlLabel
                                    control={
                                        <Radio
                                            value={option}
                                            checked={input.checked}
                                            onChange={input.onChange}
                                            disabled={disabled}
                                            required={required}
                                        />
                                    }
                                    label={option}
                                />
                            )}
                        </Field>
                    );
                })}
            </RadioGroup>
        </FormControl>
    );
};
