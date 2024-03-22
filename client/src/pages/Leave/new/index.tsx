import LeaveForm from "../../../components/LeaveForm";
import { FormView } from "../../../forms/FormView";
import DefaultPage from "../../../layout/DefaultPage";

const LeaveNew = () => {
    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <DefaultPage label="Leave New" bg>
            <FormView onSubmit={handleSubmit}>
                <LeaveForm />
            </FormView>
        </DefaultPage>
    );
};

export default LeaveNew;
