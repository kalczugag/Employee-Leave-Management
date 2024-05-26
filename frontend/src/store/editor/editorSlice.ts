import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditorState } from "draft-js";

interface WysiwygEditorState {
    editor: EditorState;
}

const initialState: WysiwygEditorState = {
    editor: EditorState.createEmpty(),
};

const editorSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        setEditorState(state, action: PayloadAction<EditorState>) {
            state.editor = action.payload;
        },
        clearEditorState(state) {
            state.editor = EditorState.createEmpty();
        },
    },
});

export const { setEditorState, clearEditorState } = editorSlice.actions;

export default editorSlice.reducer;
