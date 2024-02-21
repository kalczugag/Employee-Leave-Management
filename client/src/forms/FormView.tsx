import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../styles/editor-wysiwyg.css";
import { ReactNode, useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Form, Field } from "react-final-form";
import {
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
} from "@mui/material";

interface FormFieldProps {
    label: string;
}

const FormField = ({ label }: FormFieldProps) => {
    return (
        <Field name={label}>
            {({ input }) => (
                <div className="space-y-1">
                    <label htmlFor={input.name}>{label}</label>
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

interface FormEditorProps {
    label: string;
}

const FormEditor = ({ label }: FormEditorProps) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [editorState, setEditorState] = useState<EditorState>(
        EditorState.createEmpty()
    );

    const onEditorStateChange = (editorState: EditorState) => {
        setEditorState(editorState);
    };

    return (
        <div className="space-y-1">
            <span>{label}</span>
            <Editor
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
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
                toolbarClassName={`${
                    isFocus ? "hasFocusToolbar" : "toolbarClassName"
                }`}
                wrapperClassName="wrapperClassName"
                editorClassName={`${
                    isFocus ? "hasFocusEditor" : "editorClassName"
                }`}
                onEditorStateChange={onEditorStateChange}
            />
        </div>
    );
};

interface FormCheckboxProps {
    label: string | string[];
}

const FormCheckbox = ({ label }: FormCheckboxProps) => {
    if (Array.isArray(label)) {
        return (
            <FormGroup>
                {label.map((itemLabel, index) => (
                    <FormControlLabel
                        key={itemLabel + "_" + index.toString()}
                        control={<Checkbox />}
                        label={itemLabel}
                    />
                ))}
            </FormGroup>
        );
    }

    return <FormControlLabel control={<Checkbox />} label={label} />;
};

interface FormViewProps {
    children: ReactNode;
    initialValues?: any;
    onSubmit: (values: any) => void;
}

const FormView = ({ children, initialValues, onSubmit }: FormViewProps) => {
    return (
        <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            render={({ handleSubmit }) => (
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-10"
                >
                    {children}
                    <Button
                        className="md:w-32"
                        type="submit"
                        variant="contained"
                    >
                        Save
                    </Button>
                </form>
            )}
        />
    );
};

export { FormView, FormField, FormEditor, FormCheckbox };
