import DefaultPage from "../../layout/DefaultPage";
import FormView from "../../forms/FormView";

const NewEmployee = () => {
    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <DefaultPage label="New Employee" bg>
            <FormView onSubmit={handleSubmit} />
        </DefaultPage>
    );
};

export default NewEmployee;
