import { Form, Field } from "react-final-form";
import { TextField } from "@mui/material";

interface Props {
    // config
    onSubmit: (values: any) => void;
}

const FormView = ({ onSubmit }: Props) => {
    return (
        <Form
            onSubmit={onSubmit}
            render={(props) => (
                <form onSubmit={props.handleSubmit}>
                    <Field name="myField">
                        {(props) => (
                            <div>
                                <TextField
                                    name={props.input.name}
                                    value={props.input.value}
                                    onChange={props.input.onChange}
                                />
                            </div>
                        )}
                    </Field>
                </form>
            )}
        />
    );
};

export default FormView;
