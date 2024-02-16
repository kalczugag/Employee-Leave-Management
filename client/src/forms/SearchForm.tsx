import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

interface Props {
    // config
    onSubmit: (values: any) => void;
}

const ListSearchForm = ({ onSubmit }: Props) => {
    return (
        <Form onSubmit={onSubmit}>
            {(props) => (
                <div>
                    <form onSubmit={props.handleSubmit}>
                        <Field name="search" component="input" />
                    </form>
                    <OnChange name="search">
                        {(value, prev) => {
                            console.log(value, prev);
                        }}
                    </OnChange>
                </div>
            )}
        </Form>
    );
};

export default ListSearchForm;
