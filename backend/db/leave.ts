import mongoose, { Schema } from "mongoose";

const LeaveSchema = new mongoose.Schema(
    {
        _user: { type: Schema.Types.ObjectId, ref: "User" },
        leaveType: { type: String, required: true },
        totalDay: { type: Number, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        status: { type: String, required: false, default: "pending" },
    },
    {
        timestamps: true,
    }
);

export const LeaveModel = mongoose.model("Leave", LeaveSchema);

export const getLeaves = () => LeaveModel.find();
export const getLeaveById = (id: string) => LeaveModel.findById(id);
export const createLeave = (values: Record<string, any>) =>
    new LeaveModel(values).save().then((leave) => leave.toObject());
export const deleteLeaveById = (id: string) =>
    LeaveModel.findOneAndDelete({ _id: id });
export const updateLeaveById = (id: string, values: Record<string, any>) =>
    LeaveModel.findByIdAndUpdate(id, values);
