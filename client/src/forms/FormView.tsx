import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Form, Field } from "react-final-form";
import { Editor, EditorState } from "react-draft-wysiwyg";
import { TextField } from "@mui/material";
import { useState } from "react";

interface FieldItemProps {
    name: string;
}

const FieldItem = ({ name }: FieldItemProps) => {
    return (
        <Field name={name}>
            {({ input }) => (
                <div className="space-y-1">
                    <label htmlFor={input.name}>{name}</label>
                    <TextField
                        variant="standard"
                        name={input.name}
                        value={input.value}
                        onChange={input.onChange}
                        autoComplete="off"
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
    const [editorState, setEditorState] = useState<EditorState>(
        EditorState.createEmpty()
    );

    const onEditorStateChange = (arg: any) => {
        setEditorState(arg);
    };

    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-10"
                >
                    <FieldItem name="Department Name" />
                    <FieldItem name="Department Short Name" />
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={onEditorStateChange}
                    />
                </form>
            )}
        />
    );
};

export default FormView;
