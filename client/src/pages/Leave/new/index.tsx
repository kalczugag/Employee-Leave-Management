import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, addLeave, LeaveProps } from "../../../store";
import useSnackbar from "../../../hooks/useSnackbar";
import { FormView } from "../../../forms/FormView";
import DefaultPage from "../../../layout/DefaultPage";
import LeaveFormFields from "../../../components/LeaveFormFields";
import useNamesList from "../../../hooks/useNamesList";

const LeaveNew = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { handleOpen } = useSnackbar();
    const { namesList } = useNamesList("leaveType");

    const handleSubmit = (values: LeaveProps) => {
        dispatch(addLeave(values))
            .unwrap()
            .catch((err) => handleOpen(err.message, "error"))
            .finally(() => {
                navigate("../list");
                handleOpen("Leave Create Successful");
            });
    };

    return (
        <DefaultPage label="Leave New" bg>
            <FormView
                initialValues={{ values: namesList }}
                onSubmit={handleSubmit}
            >
                <LeaveFormFields />
            </FormView>
        </DefaultPage>
    );
};

export default LeaveNew;
