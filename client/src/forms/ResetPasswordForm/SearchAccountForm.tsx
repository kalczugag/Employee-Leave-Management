import { useState } from "react";
import { verifyEmail } from "../../store";
import useThunk from "../../hooks/useThunk";
import { Field } from "react-final-form";
import { TextField, Button } from "@mui/material";

interface Props {
    emailValue: string;
}

const SearchAccountForm = ({ emailValue }: Props) => {
    const [doVerifyEmail, verifyLoading, verifyError] = useThunk(verifyEmail);

    const required = (value: any) => (value ? undefined : "Required");

    const handleVerify = () => {
        if (emailValue) {
            doVerifyEmail(emailValue);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            handleVerify();
        }
    };

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
                            onKeyDown={handleKeyPress}
                            disabled={verifyLoading}
                            sx={{ width: "320px" }}
                            error={meta.error && verifyError}
                            helperText={
                                verifyError ? meta.error || verifyError : ""
                            }
                            fullWidth
                        />
                    </>
                )}
            </Field>
            <Button
                type="button"
                sx={{ bgcolor: "#3B82F6" }}
                variant="contained"
                disabled={verifyLoading}
                onClick={handleVerify}
            >
                Search
            </Button>
        </>
    );
};

export default SearchAccountForm;
