import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-final-form";
import { EditorState } from "draft-js";
import { Button } from "@mui/material";
import { clearEditorState } from "../../store";

interface FormViewProps {
    children: ReactNode;
    initialValues?:
        | {
              name: string;
              shortName?: string;
              details?: EditorState;
              active?: boolean;
          }
        | user
        | {
              values: string[];
          };
    onSubmit: (values: any) => void;
}

export const FormView = ({
    children,
    initialValues,
    onSubmit,
}: FormViewProps) => {
    const dispatch = useDispatch();

    if (initialValues) {
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
