import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { EditorProps } from "react-draft-wysiwyg";

interface DepartmentsState {
    data: any[];
    isLoading: boolean;
    error: any;
}

interface DepartmentProps {
    name: string;
    shortName?: string;
    details?: EditorProps;
    active?: boolean;
}

const initialState: DepartmentsState = {
    data: [],
    isLoading: false,
    error: null,
};

const departmentsSlice = createSlice({
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
    },
});

export const getDepartments = createAsyncThunk(
    "departments/getAll",
    async () => {
        const response = await axios.get("/api/departments");

        return response.data;
    }
);

export const addDepartment = createAsyncThunk(
    "departments/add",
    async (values: DepartmentProps) => {
        const response = await axios.post("/api/departments", values);

        return response.data;
    }
);

export default departmentsSlice.reducer;
