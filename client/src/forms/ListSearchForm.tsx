import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

const ListSearchForm = () => {
    const onSubmit = (values: any) => {
        console.log(values);
    };

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
