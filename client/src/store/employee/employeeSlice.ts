import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface EmployeeState {
    data: any[];
    isLoading: boolean;
    error: any;
}

const initialState: EmployeeState = {
    data: [],
    isLoading: false,
    error: null,
};

const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getEmployees.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEmployees.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getEmployees.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });

        builder
            .addCase(addEmployee.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data.push(action.payload);
            })
            .addCase(addEmployee.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });
    },
});

export const getEmployees = createAsyncThunk("employees/getAll", async () => {
    const response = await axios.get("/api/users");

    return response.data;
});

export const addEmployee = createAsyncThunk(
    "employees/add",
    async (values: user) => {
        const response = await axios.post("/api/users", values);

        return response.data;
    }
);

export default employeeSlice.reducer;
