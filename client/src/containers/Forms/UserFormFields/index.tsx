import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
    FormPassword,
    FormField,
    FormFile,
    FormSelect,
} from "../../../forms/FormView";
import { InputLabel } from "@mui/material";
import { useFormState } from "react-final-form";

const UserFormFields = () => {
    const form = useFormState();

    const { isLoading } = useSelector((state: RootState) => state.employee);

    const ROLES = ["staff", "hod", "admin"];

    return (
        <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2 col-span-2">
                <img
                    className="w-[160px] h-[80px] object-contain object-left"
                    src={
                        form.values.img ? form.values.img : "/images/avatar.jpg"
                    }
                    alt="avatar"
                />
                <InputLabel sx={{ fontWeight: 700 }}>
                    Employee Avatar
                </InputLabel>
                <InputLabel>
                    Recommended thumbnail size 800x400 (px).
                </InputLabel>
                <FormFile
                    options={{ label: "Employee Avatar", name: "img" }}
                    disabled={isLoading}
                />
            </div>
            <FormSelect
                options={{ label: "Department id", name: "departmentId" }}
                values={form.initialValues.values}
                disabled={isLoading}
            />
            <FormField
                options={{ label: "First Name", name: "firstName" }}
                placeholder="Enter First Name"
                disabled={isLoading}
            />
            <FormField
                options={{ label: "Last Name", name: "lastName" }}
                placeholder="Enter First Last"
                disabled={isLoading}
            />
            <FormSelect
                options={{ label: "Gender", name: "gender" }}
                values={["Male", "Female"]}
                disabled={isLoading}
            />
            <FormField
                options={{ label: "Phone", name: "mobile" }}
                placeholder="Enter Phone Number"
                disabled={isLoading}
            />
            <FormField
                options={{ label: "Email", name: "email" }}
                placeholder="Enter Email"
                disabled={isLoading}
            />
            <FormPassword
                options={{ label: "Password", name: "password" }}
                disabled={isLoading}
            />
            <FormSelect
                options={{ label: "Roles", name: "roles" }}
                values={ROLES}
                disabled={isLoading}
            />
            <FormField
                options={{ label: "Address", name: "address" }}
                placeholder="Enter Address"
                disabled={isLoading}
            />
            <FormField
                options={{ label: "Date Of Birth", name: "birthDate" }}
                type="date"
                disabled={isLoading}
            />
        </div>
    );
};

export default UserFormFields;
