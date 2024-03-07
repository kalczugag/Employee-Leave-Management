import mongoose from "mongoose";

const LeaveTypeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        shortName: { type: String, required: false },
        details: {
            type: Object,
            required: false,
            default: "N/A",
        },
        active: { type: Boolean, required: false, default: true },
    },
    {
        timestamps: true,
    }
);

export const LeaveTypeModel = mongoose.model("LeaveType", LeaveTypeSchema);

export const getLeaveTypes = () => LeaveTypeModel.find();
export const getLeaveTypeById = (id: string) => LeaveTypeModel.findById(id);
export const createLeaveType = (values: Record<string, any>) =>
    new LeaveTypeModel(values).save().then((leaveType) => leaveType.toObject());
export const deleteLeaveTypeById = (id: string) =>
    LeaveTypeModel.findOneAndDelete({ _id: id });
export const updateLeaveTypeById = (id: string, values: Record<string, any>) =>
    LeaveTypeModel.findByIdAndUpdate(id, values);
