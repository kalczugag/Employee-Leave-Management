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
        <div>
            <div className="flex flex-col bg-white shadow rounded min-w-80">
                <header className="relative flex items-center justify-center bg-blue-500 p-4">
                    <div className="relative w-5 h-5 bg-cyan-500 rounded-full z-10">
                        <div className="absolute -left-3 w-5 h-5 bg-white rounded-full -z-10" />
                    </div>
                    <h1 className="text-white text-2xl">INVENTORY</h1>
                </header>
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
                                            className="w-full"
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
                                            className="w-full"
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
                                        className="w-full"
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
                                        className="w-full"
                                    />
                                )}
                            </Field>
                            <Field name="password">
                                {(props) => (
                                    <FormControl
                                        variant="outlined"
                                        className="w-full"
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
            <CopyrightsFooter>
                <p>
                    Already have an account?{" "}
                    <Link to="/login" className="hover:text-gray-700">
                        Sign In
                    </Link>
                </p>
            </CopyrightsFooter>
        </div>
    );
};

export default RegisterWindow;
