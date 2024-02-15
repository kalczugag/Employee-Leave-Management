import { Form, Field } from "react-final-form";

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
                    <Field component="input" name="x" />
                </form>
            )}
        />
    );
};

export default FormView;
