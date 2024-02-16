import { Form, Field } from "react-final-form";
import { TextField } from "@mui/material";

interface FieldItemProps {
    name: string;
}

const FieldItem = ({ name }: FieldItemProps) => {
    return (
        <Field name={name}>
            {({ input }) => (
                <div>
                    <label htmlFor={input.name}>{name}</label>
                    <TextField
                        name={input.name}
                        value={input.value}
                        onChange={input.onChange}
                        fullWidth
                    />
                </div>
            )}
        </Field>
    );
};

interface FormViewProps {
    onSubmit: (values: any) => void;
}

const FormView = ({ onSubmit }: FormViewProps) => {
    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-6"
                >
                    <FieldItem name="Department Name" />
                    <FieldItem name="Department Short Name" />
                </form>
            )}
        />
    );
};

export default FormView;
