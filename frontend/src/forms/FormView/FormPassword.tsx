import { useState } from "react";
import { Field } from "react-final-form";
import {
    OutlinedInput,
    InputAdornment,
    IconButton,
    InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface FormPasswordProps {
    options: {
        label: string;
        name: string;
    };
    required?: boolean;
    disabled?: boolean;
}

export const FormPassword = ({
    options,
    required,
    disabled,
}: FormPasswordProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    return (
        <Field name={options.name}>
            {({ input, meta }) => (
                <div className="space-y-1">
                    <InputLabel>{options.label}</InputLabel>
                    <OutlinedInput
                        type={showPassword ? "text" : "password"}
                        name={input.name}
                        value={input.value}
                        onChange={input.onChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        sx={{ height: "43px" }}
                        autoComplete="off"
                        placeholder="Enter Password"
                        disabled={disabled}
                        required={required}
                        fullWidth
                    />
                </div>
            )}
        </Field>
    );
};
