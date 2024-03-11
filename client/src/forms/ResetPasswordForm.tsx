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
import Footer from "../components/Footer";
import Logo from "../components/Logo";

const ResetPasswordForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const onSubmit = (values: { email: string }) => {
        if (values.email === "") {
            return Promise.reject(new Error("Email or username is required"));
        }
    };
    const required = (value: any) => (value ? undefined : "Required");

    return (
        <>
            <div className="flex flex-col bg-white shadow rounded w-screen md:min-w-96 md:w-full">
                <Logo primary />
                <div className="flex flex-col text-center px-8 py-4">
                    <h3 className="text-lg text-gray-700 font-semibold">
                        Reset Password
                    </h3>
                    <p className="text-sm text-gray-500">
                        Enter your email address to reset your password.
                    </p>
                </div>
                <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit }) => (
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col items-center space-y-6 pb-12 py-2 px-8"
                        >
                            <Field name="email" validate={required}>
                                {({ input, meta }) => (
                                    <>
                                        <TextField
                                            variant="outlined"
                                            label="Email"
                                            name={input.name}
                                            value={input.value}
                                            onChange={input.onChange}
                                            error={
                                                meta.touched &&
                                                meta.submitError &&
                                                input.value === ""
                                            }
                                            helperText={
                                                meta.touched &&
                                                meta.submitError &&
                                                input.value === ""
                                                    ? meta.error
                                                    : ""
                                            }
                                            sx={{ width: "320px" }}
                                            fullWidth
                                        />
                                    </>
                                )}
                            </Field>
                            {/* <Field name="password">
                                {({ input, meta }) => (
                                    <div className="flex flex-col items-center space-y-1">
                                        <Link
                                            to="/reset"
                                            className="w-full text-end text-xs text-gray-500 hover:text-gray-700"
                                        >
                                            Forget your password?
                                        </Link>
                                        <FormControl
                                            variant="outlined"
                                            fullWidth
                                        >
                                            <InputLabel htmlFor="outlined-adornment-password">
                                                Password
                                            </InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
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
                                                required
                                            />
                                        </FormControl>
                                    </div>
                                )}
                            </Field> */}
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
            </div>
        </>
    );
};

export default ResetPasswordForm;
