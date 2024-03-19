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
            .addCase(getEmployee.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEmployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data.push(action.payload);
            })
            .addCase(getEmployee.rejected, (state, action) => {
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

        builder
            .addCase(editEmployee.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                editEmployee.fulfilled,
                (state, action: PayloadAction<user>) => {
                    state.isLoading = false;
                    const editedEmployee = action.payload;

                    const index = state.data.findIndex(
                        (emp: user) => emp._id === editedEmployee._id
                    );

                    console.log(editedEmployee);

                    if (index !== -1) {
                        state.data[index] = {
                            ...state.data[index],
                            firstName: editedEmployee?.firstName,
                            lastName: editedEmployee?.lastName,
                            img: editedEmployee?.img,
                            departmentId: editedEmployee?.departmentId,
                            email: editedEmployee?.email,
                            birthDate: editedEmployee?.birthDate,
                            gender: editedEmployee?.gender,
                            mobile: editedEmployee?.mobile,
                            address: editedEmployee?.address,
                            roles: editedEmployee?.roles,
                        };
                    }
                }
            )
            .addCase(editEmployee.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });

        builder
            .addCase(deleteEmployee.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.isLoading = false;

                state.data = state.data.filter((emp: user) => {
                    return emp._id !== action.payload;
                });
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });
    },
});

export const getEmployees = createAsyncThunk("employee/getAll", async () => {
    const response = await axios.get("/api/users");

    return response.data;
});

export const getEmployee = createAsyncThunk(
    "employee/get",
    async (id: string) => {
        const response = await axios.get(`/api/users/${id}`);

        return response.data;
    }
);

export const addEmployee = createAsyncThunk(
    "employee/add",
    async (values: user) => {
        const response = await axios.post("/api/users", values);

        return response.data;
    }
);

export const editEmployee = createAsyncThunk(
    "employee/edit",
    async (values: user) => {
        const response = await axios.patch(`/api/users/${values._id}`, values);

        return response.data;
    }
);

export const deleteEmployee = createAsyncThunk(
    "employee/delete",
    async (id: string) => {
        await axios.delete(`/api/users/${id}`);

        return id;
    }
);

export default employeeSlice.reducer;
