import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { RootState, editLeaveType, getLeaveType } from "../../../store";
import useThunk from "../../../hooks/useThunk";
import {
    FormView,
    FormField,
    FormEditor,
    FormCheckbox,
} from "../../../forms/FormView";
import DefaultPage from "../../../layout/DefaultPage";

const LeaveTypeEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [doFetchLeaveType] = useThunk(getLeaveType);
    const [doPatchLeaveType] = useThunk(editLeaveType);

    const data = useSelector((state: RootState) =>
        state.leaveType.data.find((value) => value._id === id)
    );

    useEffect(() => {
        if (!data) {
            doFetchLeaveType(id);
        }
    }, [data, doFetchLeaveType, id]);

    const handleSubmit = (values: any) => {
        doPatchLeaveType(values);
        navigate("../list");
    };

    return (
        <DefaultPage label="Edit Leave Type" bg>
            <FormView onSubmit={handleSubmit} initialValues={data}>
                <FormField
                    options={{ label: "Leave Type Name", name: "name" }}
                />
                <FormField
                    options={{
                        label: "Leave Type Short Name",
                        name: "shortName",
                    }}
                />
                <FormEditor
                    options={{ label: "Leave Type Details", name: "details" }}
                />
                <FormCheckbox
                    options={{ label: "Leave Type Status", name: "active" }}
                />
            </FormView>
        </DefaultPage>
    );
};

export default LeaveTypeEdit;
