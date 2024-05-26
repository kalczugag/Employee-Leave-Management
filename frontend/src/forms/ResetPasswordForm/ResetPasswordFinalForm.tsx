import { useState } from "react";
import { useDispatch } from "react-redux";
import { Field } from "react-final-form";
import { setAuthPage } from "../../store";
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    InputAdornment,
    OutlinedInput,
    IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ResetPasswordForm = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const required = (value: any) => (value ? undefined : "Required");

    return (
        <>
            <Field name="email" validate={required}>
                {({ input, meta }) => (
                    <>
                        <TextField
                            variant="outlined"
                            label="Email"
                            name={input.name}
                            value={input.value}
                            onChange={input.onChange}
                            sx={{ width: "320px" }}
                            fullWidth
                            required
                        />
                    </>
                )}
            </Field>
            <Field name="password">
                {({ input, meta }) => (
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">
                            New Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            name={input.name}
                            value={input.value}
                            onChange={input.onChange}
                            autoFocus
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
                            label="New Password"
                            sx={{ width: "320px" }}
                            required
                        />
                    </FormControl>
                )}
            </Field>
            <div className="flex flex-row justify-between w-[calc(320px)]">
                <Button
                    type="button"
                    onClick={() => dispatch(setAuthPage(0))}
                    variant="contained"
                    color="inherit"
                >
                    Back
                </Button>
                <Button
                    type="submit"
                    sx={{ bgcolor: "#3B82F6" }}
                    variant="contained"
                >
                    Reset Password
                </Button>
            </div>
        </>
    );
};

export default ResetPasswordForm;
