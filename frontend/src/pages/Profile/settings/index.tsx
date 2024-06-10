import { useDispatch } from "react-redux";
import { AppDispatch, changePassword } from "../../../store";
import useSnackbar from "../../../hooks/useSnackbar";
import { FormPassword, FormView } from "../../../forms/FormView";
import DefaultPage from "../../../layout/DefaultPage";

const ProfileSettings = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { handleOpen } = useSnackbar();

    const handleSubmit = (values: any) => {
        dispatch(changePassword(values))
            .then(() => handleOpen("Password Change Successful"))
            .catch((err) => handleOpen("Something went wrong!", "error"));
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
