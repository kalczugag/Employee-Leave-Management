import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        departmentId: { type: String, required: false },
        img: { type: String, required: false, default: "/images/avatar.jpg" },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        birthDate: { type: String, required: true },
        gender: { type: String, required: false },
        mobile: { type: String, required: false },
        address: { type: String, required: false },
        roles: { type: String, required: true, default: "staff" },
        authentication: {
            password: { type: String, required: true, select: false },
            salt: { type: String, select: false },
            sessionToken: { type: String, select: false },
        },
    },
    { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
    UserModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) =>
    new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) =>
    UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
    UserModel.findByIdAndUpdate(id, values);
