import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { EditorProps } from "react-draft-wysiwyg";

interface DepartmentState {
    data: DepartmentProps[];
    isLoading: boolean;
    error: any;
}

export interface DepartmentProps {
    _id?: string;
    name: string;
    shortName?: string;
    details?: EditorProps | any;
    active?: boolean;
}

const initialState: DepartmentState = {
    data: [],
    isLoading: false,
    error: null,
};

const departmentSlice = createSlice({
    name: "department",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getDepartments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDepartments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getDepartments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });

        builder
            .addCase(getDepartment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDepartment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data.push(action.payload);
            })
            .addCase(getDepartment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });

        builder
            .addCase(addDepartment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addDepartment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data.push(action.payload);
            })
            .addCase(addDepartment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });

        builder
            .addCase(editDepartment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                editDepartment.fulfilled,
                (state, action: PayloadAction<DepartmentProps>) => {
                    state.isLoading = false;
                    const editedDepartment = action.payload;

                    const index = state.data.findIndex(
                        (dep) => dep._id === editedDepartment._id
                    );

                    if (index !== -1) {
                        state.data[index] = {
                            ...state.data[index],
                            name: editedDepartment?.name,
                            shortName: editedDepartment?.shortName,
                            details: editedDepartment?.details,
                            active: editedDepartment?.active,
                        };
                    }
                }
            )
            .addCase(editDepartment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });

        builder
            .addCase(deleteDepartment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteDepartment.fulfilled, (state, action) => {
                state.isLoading = false;

                state.data = state.data.filter((dep) => {
                    return dep._id !== action.payload;
                });
            })
            .addCase(deleteDepartment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });
    },
});

export const getDepartments = createAsyncThunk(
    "department/getAll",
    async () => {
        const response = await axios.get("/api/departments");

        return response.data;
    }
);

export const getDepartment = createAsyncThunk(
    "department/get",
    async (id: string) => {
        const response = await axios.get(`/api/departments/${id}`);

        return response.data;
    }
);

export const addDepartment = createAsyncThunk(
    "department/add",
    async (values: DepartmentProps) => {
        const response = await axios.post("/api/departments", values);

        return response.data;
    }
);

export const editDepartment = createAsyncThunk(
    "department/edit",
    async (values: DepartmentProps) => {
        const response = await axios.patch(
            `/api/departments/${values._id}`,
            values
        );

        return response.data;
    }
);

export const deleteDepartment = createAsyncThunk(
    "department/delete",
    async (id: string) => {
        await axios.delete(`/api/departments/${id}`);

        return id;
    }
);

export default departmentSlice.reducer;
