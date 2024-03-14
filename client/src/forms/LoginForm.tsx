import { useState } from "react";
import { Link } from "react-router-dom";
import { Field, Form } from "react-final-form";
import { useDispatch } from "react-redux";
import { AppDispatch, login } from "../store";
import useSnackbar from "../hooks/useSnackbar";
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    InputAdornment,
    OutlinedInput,
    IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginWindow = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { handleOpen } = useSnackbar();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const onSubmit = (values: { email: string; password: string }) => {
        dispatch(login(values))
            .unwrap()
            .catch((err: any) => console.log(err))
            .finally(() => handleOpen("xd"));
    };

    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center space-y-6 pb-12 py-2 px-8"
                >
                    <Field name="email">
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
                            <div className="flex flex-col items-center space-y-1">
                                <Link
                                    to="/password/reset"
                                    className="w-full text-end text-xs text-gray-500 hover:text-gray-700"
                                >
                                    Forget your password?
                                </Link>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        Password
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name={input.name}
                                        value={input.value}
                                        onChange={input.onChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
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
                                        label="Password"
                                        sx={{ width: "320px" }}
                                        fullWidth
                                        required
                                    />
                                </FormControl>
                            </div>
                        )}
                    </Field>
                    <Button
                        type="submit"
                        sx={{ bgcolor: "#3B82F6" }}
                        variant="contained"
                    >
                        Log In
                    </Button>
                </form>
            )}
        />
    );
};

export default LoginWindow;
