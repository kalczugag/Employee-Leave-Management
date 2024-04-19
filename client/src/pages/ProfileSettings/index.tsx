import { FormPassword, FormView } from "../../forms/FormView";
import useSnackbar from "../../hooks/useSnackbar";
import DefaultPage from "../../layout/DefaultPage";

const ProfileSettings = () => {
    const { handleOpen } = useSnackbar();

    const handleSubmit = (values: any) => {
        if (
            !values.currentPassword ||
            !values.confirmNewPassword ||
            !values.newPassword
        ) {
            handleOpen("Fields can't be empty", "error");
        } else {
        }
    };

    return (
        <DefaultPage label="Change Password" bg>
            <FormView onSubmit={handleSubmit}>
                <FormPassword
                    options={{
                        label: "Current Password",
                        name: "currentPassword",
                    }}
                    required
                />
                <FormPassword
                    options={{
                        label: "New Password",
                        name: "newPassword",
                    }}
                    required
                />
                <FormPassword
                    options={{
                        label: "Confirm New Password",
                        name: "confirmNewPassword",
                    }}
                    required
                />
            </FormView>
        </DefaultPage>
    );
};

export default ProfileSettings;
