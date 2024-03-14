import { useSelector } from "react-redux";
import { Form } from "react-final-form";
import { RootState, resetPassword } from "../../store";
import SearchAccountForm from "./SearchAccountForm";
import ResetPasswordFinalForm from "./ResetPasswordFinalForm";
import useThunk from "../../hooks/useThunk";

const ResetPasswordForm = () => {
    const [doResetPassword, resetLoading] = useThunk(resetPassword);

    const page = useSelector((state: RootState) => state.user.resetPage);

    const onSubmit = (values: any) => {
        console.log(values);
        doResetPassword(values);
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
