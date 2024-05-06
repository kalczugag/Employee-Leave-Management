import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface EmployeeState {
    data: user[];
    totalPages: number;
    totalUsersCount: number;
    isLoading: boolean;
    error: any;
    fulldata: boolean;
}

const initialState: EmployeeState = {
    data: [],
    totalPages: 0,
    totalUsersCount: 0,
    isLoading: false,
    error: null,
    fulldata: false,
};

const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        setEmployee(state, action: PayloadAction<user>) {
            state.data.push(action.payload);
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getEmployees.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEmployees.fulfilled, (state, action) => {
                state.isLoading = false;
                if (state.data.length === 0) {
                    state.data = action.payload.data.users;
                } else {
                    state.data.push(...action.payload.data.users);
                }
                state.fulldata = action.payload.fullData;
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
                state.data.push(action.payload.data);
                state.fulldata = action.payload.selectQuery;
            })
            .addCase(getEmployee.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });

        builder
            .addCase(getEmployeesByIds.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEmployeesByIds.fulfilled, (state, action) => {
                state.isLoading = false;
                if (state.data.length === 0) {
                    state.data = action.payload.data;
                } else {
                    state.data.push(...action.payload.data);
                }
                state.fulldata = action.payload.selectQuery;
            })
            .addCase(getEmployeesByIds.rejected, (state, action) => {
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

export const getEmployees = createAsyncThunk(
    "employee/getAll",
    async (byRole: string) => {
        const response = await axios.get("/api/users", {
            params: { byRole },
        });

        return { data: response.data, fullData: byRole ? false : true };
    }
);

export const getEmployee = createAsyncThunk(
    "employee/get",
    async ({ id, selectQuery }: { id: string; selectQuery: string }) => {
        const response = await axios.get(`/api/users/${id}`, {
            params: { fields: selectQuery },
        });

        return { data: response.data, selectQuery: selectQuery ? false : true };
    }
);

export const getEmployeesByIds = createAsyncThunk(
    "employee/getByIds",
    async (options: any) => {
        const response = await axios.get("/api/users/byIds", {
            params: {
                ids: options.ids,
                fields: options.selectQuery,
            },
        });

        return {
            data: response.data,
            selectQuery: options.selectQuery ? false : true,
        };
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

export const { setEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
