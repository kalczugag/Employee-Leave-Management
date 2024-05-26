import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../styles/editor-wysiwyg.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, setEditorState } from "../../store";
import { Field } from "react-final-form";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { InputLabel } from "@mui/material";

interface FormEditorProps {
    options: {
        label: string;
        name: string;
    };
    disabled?: boolean;
}

export const FormEditor = ({ options }: FormEditorProps) => {
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
                    <InputLabel>{options.label}</InputLabel>
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
