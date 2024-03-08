import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, editDepartment, getDepartment } from "../../../store";
import useThunk from "../../../hooks/useThunk";
import DefaultPage from "../../../layout/DefaultPage";
import {
    FormView,
    FormField,
    FormEditor,
    FormCheckbox,
} from "../../../forms/FormView";

const DepartmentEdit = () => {
    const { id } = useParams();
    const [doFetchDepartment] = useThunk(getDepartment);
    const [doPatchDepartment] = useThunk(editDepartment);

    const data = useSelector((state: RootState) =>
        state.department.data.find((value) => value._id === id)
    );

    useEffect(() => {
        if (!data) {
            doFetchDepartment(id);
        }
    }, [data, doFetchDepartment, id]);

    const handleSubmit = (values: any) => {
        doPatchDepartment(values);
        console.log(values);
    };

    return (
        <DefaultPage label="Edit Department" bg>
            <FormView onSubmit={handleSubmit} initialValues={data}>
                <FormField
                    required
                    options={{ label: "Department Name", name: "name" }}
                />
                <FormField
                    options={{
                        label: "Department Short Name",
                        name: "shortName",
                    }}
                />
                <FormEditor
                    options={{ label: "Department Details", name: "details" }}
                />
                <FormCheckbox
                    options={{ label: "Department Status", name: "active" }}
                />
            </FormView>
        </DefaultPage>
    );
};

export default DepartmentEdit;
