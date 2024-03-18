import { useState } from "react";
import { Link } from "react-router-dom";
import { Field } from "react-final-form";
import { OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface FormPasswordProps {
    required?: boolean;
    disabled?: boolean;
}

export const FormPassword = ({ required, disabled }: FormPasswordProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    return (
        <Field name="password">
            {({ input, meta }) => (
                <div className="space-y-1">
                    <label htmlFor="outlined-adornment-password">
                        Password
                    </label>
                    <OutlinedInput
                        id="outlined-adornment-password"
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
                        disabled={disabled}
                        required={required}
                        fullWidth
                    />
                </div>
            )}
        </Field>
    );
};
