import { useState } from "react";
import { Field, Form } from "react-final-form";
import { TextField, Button } from "@mui/material";

interface Props {
    onSubmit: (values: any) => void;
    handleClick: () => void;
}

const SearchAccountForm = ({ onSubmit, handleClick }: Props) => {
    const [error, setError] = useState(false);

    const required = (value: any) => (value ? undefined : "Required");

    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form }) => (
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
                                    sx={{ width: "320px" }}
                                    error={error}
                                    helperText={error ? meta.error : ""}
                                    fullWidth
                                />
                            </>
                        )}
                    </Field>
                    <Button
                        type="button"
                        sx={{ bgcolor: "#3B82F6" }}
                        variant="contained"
                        onClick={() => {
                            if (form.getState().values.email) {
                                handleClick();
                            } else {
                                setError(true);
                            }
                        }}
                    >
                        Search
                    </Button>
                </form>
            )}
        />
    );
};

export default SearchAccountForm;
