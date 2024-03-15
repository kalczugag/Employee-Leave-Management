import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    AppDispatch,
    RootState,
    editDepartment,
    getDepartment,
} from "../../../store";
import useThunk from "../../../hooks/useThunk";
import useSnackbar from "../../../hooks/useSnackbar";
import DefaultPage from "../../../layout/DefaultPage";
import {
    FormView,
    FormField,
    FormEditor,
    FormCheckbox,
} from "../../../forms/FormView";

const DepartmentEdit = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { handleOpen } = useSnackbar();

    const [doFetchDepartment, isFetching] = useThunk(getDepartment);

    const { isLoading } = useSelector((state: RootState) => state.department);
    const data = useSelector((state: RootState) =>
        state.department.data.find((value) => value._id === id)
    );

    useEffect(() => {
        if (!data && !isFetching) {
            doFetchDepartment(id);
        }
    }, []);

    const handleSubmit = (values: any) => {
        dispatch(editDepartment(values))
            .unwrap()
            .catch((err) => handleOpen(err))
            .finally(() => {
                navigate("../list");
                handleOpen("Department Update Successful");
            });
    };

    return (
        <DefaultPage label="Edit Department" bg>
            <FormView onSubmit={handleSubmit} initialValues={data}>
                <FormField
                    required
                    options={{ label: "Department Name", name: "name" }}
                    disabled={isLoading}
                />
                <FormField
                    options={{
                        label: "Department Short Name",
                        name: "shortName",
                    }}
                    disabled={isLoading}
                />
                <FormEditor
                    options={{ label: "Department Details", name: "details" }}
                    disabled={isLoading}
                />
                <FormCheckbox
                    options={{ label: "Department Status", name: "active" }}
                    disabled={isLoading}
                />
            </FormView>
        </DefaultPage>
    );
};

export default DepartmentEdit;
