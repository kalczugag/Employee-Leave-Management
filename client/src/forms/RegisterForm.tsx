import { useState } from "react";
import { Field, Form } from "react-final-form";
import { useDispatch } from "react-redux";
import { AppDispatch, register } from "../store";
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
import useSnackbar from "../hooks/useSnackbar";

const RegisterWindow = () => {
    const { handleOpen } = useSnackbar();
    const dispatch = useDispatch<AppDispatch>();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const onSubmit = (values: user) => {
        dispatch(register(values))
            .unwrap()
            .catch((err) => handleOpen("Error"));
    };

    return (
        <Form
            onSubmit={onSubmit}
            initialValues={{ birthDate: "2000-01-01" }}
            render={({ handleSubmit }) => (
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center space-y-6 pb-12 py-2 px-8"
                >
                    <div className="flex flex-row space-x-2 w-[calc(320px)]">
                        <Field name="firstName">
                            {({ input, meta }) => (
                                <TextField
                                    variant="outlined"
                                    label="First Name"
                                    name={input.name}
                                    value={input.value}
                                    onChange={input.onChange}
                                    required
                                    fullWidth
                                />
                            )}
                        </Field>
                        <Field name="lastName">
                            {({ input, meta }) => (
                                <TextField
                                    variant="outlined"
                                    label="Last Name"
                                    name={input.name}
                                    value={input.value}
                                    onChange={input.onChange}
                                    required
                                    fullWidth
                                />
                            )}
                        </Field>
                    </div>
                    <Field name="birthDate">
                        {({ input, meta }) => (
                            <TextField
                                type="date"
                                label="Birth Date"
                                variant="outlined"
                                name={input.name}
                                value={input.value}
                                onChange={input.onChange}
                                sx={{ width: "320px" }}
                                required
                            />
                        )}
                    </Field>
                    <Field name="email">
                        {({ input, meta }) => (
                            <TextField
                                variant="outlined"
                                label="Email"
                                name={input.name}
                                value={input.value}
                                onChange={input.onChange}
                                sx={{ width: "320px" }}
                                required
                            />
                        )}
                    </Field>
                    <Field name="password">
                        {({ input, meta }) => (
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Password
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    name={input.name}
                                    value={input.value}
                                    onChange={input.onChange}
                                    type={showPassword ? "text" : "password"}
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
    );
};

export default RegisterWindow;
