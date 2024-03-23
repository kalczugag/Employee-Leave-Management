import { useDispatch } from "react-redux";
import { Field } from "react-final-form";
import useAuth from "../../hooks/useAuth";
import useSnackbar from "../../hooks/useSnackbar";
import { AppDispatch, verifyEmail } from "../../store";
import { TextField, Button } from "@mui/material";

interface Props {
    emailValue: string;
}

const SearchAccountForm = ({ emailValue }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const { handleOpen } = useSnackbar();
    const { isLoading } = useAuth();

    const required = (value: any) => (value ? undefined : "Required");

    const handleVerify = () => {
        if (emailValue) {
            dispatch(verifyEmail(emailValue))
                .unwrap()
                .catch((err) => handleOpen("Address not Found", "error"));
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
                            disabled={isLoading}
                            sx={{ width: "320px" }}
                            fullWidth
                        />
                    </>
                )}
            </Field>
            <Button
                type="button"
                sx={{ bgcolor: "#3B82F6" }}
                variant="contained"
                disabled={isLoading}
                onClick={handleVerify}
            >
                Search
            </Button>
        </>
    );
};

export default SearchAccountForm;
