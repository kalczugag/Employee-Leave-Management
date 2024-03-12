import { useState } from "react";
import SearchAccountForm from "./SearchAccountForm";
import ResetPasswordFinalForm from "./ResetPasswordFinalForm";

const ResetPasswordForm = () => {
    const [page, setPage] = useState<number>(0);

    const onSubmit = (values: any) => {
        console.log(values, page);
        // setPage(page + 1);
    };

    const handleClick = () => {
        setPage(page + 1);
    };

    const handleBack = () => {
        setPage(page - 1);
    };

    return (
        <div>
            {page === 0 ? (
                <SearchAccountForm
                    onSubmit={onSubmit}
                    handleClick={handleClick}
                />
            ) : (
                <ResetPasswordFinalForm handleBack={handleBack} />
            )}
        </div>
    );
};

export default ResetPasswordForm;
