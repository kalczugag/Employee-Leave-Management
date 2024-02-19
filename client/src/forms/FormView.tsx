import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../styles/editor-wysiwyg.css";
import { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Form, Field } from "react-final-form";
import { TextField } from "@mui/material";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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
                        variant="outlined"
                        name={input.name}
                        value={input.value}
                        onChange={input.onChange}
                        inputProps={{
                            style: {
                                padding: 10,
                            },
                        }}
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

    const onEditorStateChange = (editorState: EditorState) => {
        setEditorState(editorState);
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
                        toolbar={{
                            options: [
                                "inline",
                                "blockType",
                                "list",
                                "textAlign",
                                "history",
                            ],
                            inline: { inDropdown: false },
                            list: { inDropdown: true },
                            textAlign: { inDropdown: true },
                            link: { inDropdown: true },
                            history: { inDropdown: true },
                        }}
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
