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
import Footer from "../Footer";
import Logo from "../Logo";

const RegisterWindow = () => {
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
        <>
            <div className="flex flex-col bg-white shadow rounded w-screen md:min-w-96 md:w-full">
                <Logo primary />
                <div className="flex flex-col text-center px-8 py-4">
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
                    initialValues={{ birthDate: "2000-01-01" }}
                    render={({ handleSubmit }) => (
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col items-center space-y-6 pb-12 py-2 px-8"
                        >
                            <div className="flex flex-row space-x-2">
                                <Field name="firstName">
                                    {(props) => (
                                        <TextField
                                            variant="outlined"
                                            label="First Name"
                                            name={props.input.name}
                                            value={props.input.value}
                                            onChange={props.input.onChange}
                                        />
                                    )}
                                </Field>
                                <Field name="lastName">
                                    {(props) => (
                                        <TextField
                                            variant="outlined"
                                            label="Last Name"
                                            name={props.input.name}
                                            value={props.input.value}
                                            onChange={props.input.onChange}
                                        />
                                    )}
                                </Field>
                            </div>
                            <Field name="birthDate">
                                {(props) => (
                                    <TextField
                                        type="date"
                                        label="Birth Date"
                                        variant="outlined"
                                        name={props.input.name}
                                        value={props.input.value}
                                        onChange={props.input.onChange}
                                        fullWidth
                                    />
                                )}
                            </Field>
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
                                    <FormControl variant="outlined" fullWidth>
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
                                )}
                            </Field>
                            <Button
                                type="submit"
                                sx={{ bgcolor: "#3B82F6" }}
                                variant="contained"
                            >
                                Register
                            </Button>
                        </form>
                    )}
                />
            </div>
            <Footer center>
                <span>
                    Already have an account?{" "}
                    <Link to="/login" className="hover:text-gray-700">
                        Sign In
                    </Link>
                </span>
            </Footer>
        </>
    );
};

export default RegisterWindow;
