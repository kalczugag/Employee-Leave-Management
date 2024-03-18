import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { FormField, FormFile, FormSelect } from "../../forms/FormView";
import { FormPassword } from "../../forms/FormView/FormPassword";

const UserForm = () => {
    const { isLoading } = useSelector((state: RootState) => state.employee);

    return (
        <div className="grid grid-cols-2 gap-6">
            <FormFile
                options={{ label: "Employee Avatar", name: "img" }}
                disabled={isLoading}
            />
            <FormSelect
                options={{ label: "Department id", name: "departmentId" }}
                values={["dep1", "dep2", "dep3"]}
                disabled={isLoading}
            />
            <FormField
                options={{ label: "First Name", name: "firstName" }}
                disabled={isLoading}
            />
            <FormField
                options={{ label: "Last Name", name: "lastName" }}
                disabled={isLoading}
            />
            <FormSelect
                options={{ label: "Gender", name: "gender" }}
                values={["Male", "Female"]}
                disabled={isLoading}
            />
            <FormField
                options={{ label: "Phone", name: "mobile" }}
                disabled={isLoading}
            />
            <FormField
                options={{ label: "Email", name: "email" }}
                disabled={isLoading}
            />
            <FormPassword disabled={isLoading} />
            <FormField
                options={{ label: "Address", name: "address" }}
                disabled={isLoading}
            />
        </div>
    );
};

export default UserForm;
