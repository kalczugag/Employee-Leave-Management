import { useState } from "react";
import { Link } from "react-router-dom";
import { Field, Form } from "react-final-form";
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
import CopyrightsFooter from "./CopyrightsFooter";
import Logo from "./Logo";

const LoginWindow = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const onSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <div>
            <div className="flex flex-col bg-white shadow rounded min-w-80">
                <Logo primary />
                <div className="flex flex-col text-center p-8">
                    <h3 className="text-lg text-gray-700 font-semibold">
                        Sign In
                    </h3>
                    <p className="text-sm text-gray-500">
                        Enter your email address and password to access admin
                        panel
                    </p>
                </div>
                <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit }) => (
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col items-center space-y-6 pb-12 py-2 px-8"
                        >
                            <Field name="email">
                                {(props) => (
                                    <TextField
                                        variant="outlined"
                                        label="Email"
                                        name={props.input.name}
                                        value={props.input.value}
                                        onChange={props.input.onChange}
                                        fullWidth
                                    />
                                )}
                            </Field>
                            <Field name="password">
                                {(props) => (
                                    <div className="text-end space-y-1">
                                        <Link
                                            to="/reset"
                                            className="text-xs text-gray-500 hover:text-gray-700"
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
                                                name={props.input.name}
                                                value={props.input.value}
                                                onChange={props.input.onChange}
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
            </div>
            <CopyrightsFooter>
                <p>
                    Don't have an account?{" "}
                    <Link to="/register" className="hover:text-gray-700">
                        Sign Up
                    </Link>
                </p>
            </CopyrightsFooter>
        </div>
    );
};

export default LoginWindow;
