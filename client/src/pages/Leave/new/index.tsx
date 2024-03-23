import { FormView } from "../../../forms/FormView";
import DefaultPage from "../../../layout/DefaultPage";
import LeaveFormFields from "../../../components/LeaveFormFields";

const LeaveNew = () => {
    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <DefaultPage label="Leave New" bg>
            <FormView onSubmit={handleSubmit}>
                <LeaveFormFields />
            </FormView>
        </DefaultPage>
    );
};

export default LeaveNew;
