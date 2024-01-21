import { Link } from "react-router-dom";
import { Field, Form } from "react-final-form";
import { TextField, Button } from "@mui/material";

const LoginWindow = () => {
    const onSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <div className="flex flex-col bg-white shadow rounded">
            <header className="relative flex items-center justify-center bg-blue-500 p-4">
                <div className="relative w-5 h-5 bg-cyan-500 rounded-full z-10">
                    <div className="absolute -left-3 w-5 h-5 bg-white rounded-full -z-10" />
                </div>
                <h1 className="text-white text-2xl">INVENTORY</h1>
            </header>
            <div className="flex flex-col text-center p-8">
                <h3 className="text-lg text-gray-700 font-semibold">Sign In</h3>
                <p className="text-sm text-gray-500">
                    Enter your email address and password to access admin panel
                </p>
            </div>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col items-center space-y-4 pb-12 py-4 px-8"
                    >
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
                                <div className="text-end space-y-1">
                                    <Link
                                        to="/reset"
                                        className="text-xs text-gray-500 hover:text-gray-700"
                                    >
                                        Forget your password?
                                    </Link>
                                    <TextField
                                        type="password"
                                        variant="outlined"
                                        label="Password"
                                        name={props.input.name}
                                        value={props.input.value}
                                        onChange={props.input.onChange}
                                        className="w-full"
                                    />
                                </div>
                            )}
                        </Field>
                        <Button sx={{ bgcolor: "#3B82F6" }} variant="contained">
                            Log In
                        </Button>
                    </form>
                )}
            />
        </div>
    );
};

export default LoginWindow;
