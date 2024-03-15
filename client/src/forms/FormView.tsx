import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../styles/editor-wysiwyg.css";
import { ReactNode, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditorState } from "draft-js";
import { RootState, setEditorState, clearEditorState } from "../store";
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
    options: {
        label: string;
        name: string;
    };
    required?: boolean;
    disabled?: boolean;
}

const FormField = ({ options, required, disabled }: FormFieldProps) => {
    return (
        <Field name={options.name}>
            {({ input, meta }) => (
                <div className="space-y-1">
                    <label htmlFor={input.name}>{options.label}</label>
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
                        disabled={disabled}
                        required={required}
                        fullWidth
                    />
                </div>
            )}
        </Field>
    );
};

interface FormEditorProps {
    options: {
        label: string;
        name: string;
    };
    disabled?: boolean;
}

const FormEditor = ({ options }: FormEditorProps) => {
    const dispatch = useDispatch();
    const { editor } = useSelector((state: RootState) => state.editor);

    const [isFocus, setIsFocus] = useState<boolean>(false);

    const onEditorStateChange = (editorState: EditorState) => {
        dispatch(setEditorState(editorState));
    };

    return (
        <Field name={options.name}>
            {({ input, meta }) => (
                <div className="space-y-1">
                    <span>{options.label}</span>
                    <Editor
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={input.onChange}
                        toolbar={{
                            options: [
                                "inline",
                                "blockType",
                                "textAlign",
                                "history",
                            ],
                            inline: { inDropdown: false },
                            textAlign: { inDropdown: true },
                            link: { inDropdown: true },
                        }}
                        editorState={editor}
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
            )}
        </Field>
    );
};

interface FormCheckboxProps {
    options:
        | {
              label: string;
              name: string;
          }
        | {
              label: string;
              name: string;
          }[];
    required?: boolean;
    disabled?: boolean;
}

const FormCheckbox = ({ options, required, disabled }: FormCheckboxProps) => {
    if (Array.isArray(options)) {
        return (
            <FormGroup>
                {options.map((itemOptions, index) => (
                    <Field name={itemOptions.name} type="checkbox">
                        {({ input, meta }) => (
                            <FormControlLabel
                                key={itemOptions.name + "_" + index.toString()}
                                control={
                                    <Checkbox
                                        checked={input.checked}
                                        onChange={input.onChange}
                                        name={input.name}
                                        disabled={disabled}
                                        required={required}
                                    />
                                }
                                label={itemOptions.label}
                            />
                        )}
                    </Field>
                ))}
            </FormGroup>
        );
    }

    return (
        <Field name={options.name} type="checkbox">
            {({ input, meta }) => (
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={input.checked}
                            onChange={input.onChange}
                            name={input.name}
                            disabled={disabled}
                            required={required}
                        />
                    }
                    label={options.label}
                />
            )}
        </Field>
    );
};

interface FormViewProps {
    children: ReactNode;
    initialValues?: {
        name: string;
        shortName?: string;
        details?: EditorState;
        active?: boolean;
    };
    onSubmit: (values: any) => void;
}

const FormView = ({ children, initialValues, onSubmit }: FormViewProps) => {
    const dispatch = useDispatch();

    if (initialValues && initialValues.details) {
        // dispatch(setEditorState(initialValues.details));
    }

    return (
        <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            render={({ handleSubmit, form }) => (
                <form
                    onSubmit={(event) => {
                        handleSubmit(event);
                        dispatch(clearEditorState());
                        form.reset();
                    }}
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
