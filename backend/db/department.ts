import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        shortName: { type: String, required: false },
        details: {
            type: mongoose.Schema.Types.Mixed,
            required: false,
            default: "N/A",
        },
        head: { type: String, required: false, default: "Not assigned" },
        active: { type: Boolean, required: false, default: true },
    },
    {
        timestamps: true,
    }
);

export const DepartmentModel = mongoose.model("Department", DepartmentSchema);

export const getDepartments = () => DepartmentModel.find();
export const getDepartmentById = (id: string) => DepartmentModel.findById(id);
export const createDepartment = (values: Record<string, any>) =>
    new DepartmentModel(values)
        .save()
        .then((department) => department.toObject());
export const deleteDepartmentById = (id: string) =>
    DepartmentModel.findOneAndDelete({ _id: id });
export const updateDepartmentById = (id: string, values: Record<string, any>) =>
    DepartmentModel.findByIdAndUpdate(id, values);
