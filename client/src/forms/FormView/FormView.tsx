import React, { ReactNode } from "react";
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
          }
        | any;
    disabled?: boolean;
    onSubmit: (values: any) => void;
}

export const FormView = ({
    children,
    initialValues,
    disabled,
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
                    <div className="space-x-2">
                        <Button
                            className="md:w-32"
                            type="submit"
                            variant="contained"
                            disabled={disabled}
                        >
                            Save
                        </Button>
                        {/* {disabled && (
                            <span className="text-sm text-red-600">
                                Not enough permissions to access.
                            </span>
                        )} */}
                    </div>
                </form>
            )}
        />
    );
};
