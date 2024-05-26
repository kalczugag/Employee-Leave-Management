import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-final-form";
import { AppDispatch, RootState, resetPassword } from "../../store";
import useSnackbar from "../../hooks/useSnackbar";
import SearchAccountForm from "./SearchAccountForm";
import ResetPasswordFinalForm from "./ResetPasswordFinalForm";

const ResetPasswordForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { handleOpen } = useSnackbar();

    const page = useSelector((state: RootState) => state.user.resetPage);

    const onSubmit = (values: any) => {
        dispatch(resetPassword(values))
            .unwrap()
            .catch((err) =>
                handleOpen("Error processing the password reset", "error")
            );
    };

    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form }) => (
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center space-y-6 pb-12 py-2 px-8"
                >
                    {page === 0 ? (
                        <SearchAccountForm
                            emailValue={form.getState().values.email}
                        />
                    ) : (
                        <ResetPasswordFinalForm />
                    )}
                </form>
            )}
        />
    );
};

export default ResetPasswordForm;
