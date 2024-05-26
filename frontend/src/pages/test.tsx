import { useSelector } from "react-redux";
import { RootState } from "../store";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "dompurify";
import DefaultPage from "../layout/DefaultPage";
import { FormView, FormEditor } from "../forms/FormView";

const Test = () => {
    const { editor } = useSelector((state: RootState) => state.editor);

    const rawContentState = convertToRaw(editor.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    const sanitizedMarkup = DOMPurify.sanitize(markup);

    const onSubmit = (v: any) => {
        console.log(v);
    };

    return (
        <DefaultPage label="test" bg>
            <FormView onSubmit={onSubmit}>
                <FormEditor options={{ label: "test wysiwyg", name: "x" }} />
            </FormView>
            <div dangerouslySetInnerHTML={{ __html: sanitizedMarkup }} />
        </DefaultPage>
    );
};

export default Test;
