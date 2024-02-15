import DefaultPage from "../../layout/DefaultPage";
import FormView from "../../forms/FormView";

const NewDepartment = () => {
    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <DefaultPage label="Create Department" bg>
            <FormView onSubmit={handleSubmit} />
        </DefaultPage>
    );
};

export default NewDepartment;
