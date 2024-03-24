import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface LeaveState {
    data: any[];
    isLoading: boolean;
    error: any;
}

interface StatusUnion {
    status: "pending" | "approved" | "rejected";
}

interface LeaveProps {
    _id?: string;
    leaveType: string;
    totalDay: number;
    hodStatus?: StatusUnion;
    adminStatus?: StatusUnion;
}

const initialState: LeaveState = {
    data: [],
    isLoading: false,
    error: null,
};

const leaveSlice = createSlice({
    name: "leave",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getLeaves.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLeaves.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getLeaves.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });

        builder
            .addCase(getLeave.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLeave.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data.push(action.payload);
            })
            .addCase(getLeave.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });

        builder
            .addCase(addLeave.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addLeave.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data.push(action.payload);
            })
            .addCase(addLeave.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });

        builder
            .addCase(editLeave.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                editLeave.fulfilled,
                (state, action: PayloadAction<LeaveProps>) => {
                    state.isLoading = false;
                    const editedLeave = action.payload;

                    const index = state.data.findIndex(
                        (leave: LeaveProps) => leave._id === editedLeave._id
                    );

                    if (index !== -1) {
                        state.data[index] = {
                            ...state.data[index],
                            leaveType: editedLeave?.leaveType,
                            totalDay: editedLeave?.totalDay,
                            hodStatus: editedLeave?.hodStatus,
                            adminStatus: editedLeave?.adminStatus,
                        };
                    }
                }
            )
            .addCase(editLeave.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });

        builder
            .addCase(deleteLeave.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteLeave.fulfilled, (state, action) => {
                state.isLoading = false;

                state.data = state.data.filter((leave: LeaveProps) => {
                    return leave._id !== action.payload;
                });
            })
            .addCase(deleteLeave.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });
    },
});

export const getLeaves = createAsyncThunk("leave/getAll", async () => {
    const response = await axios.get("/api/leaves");

    return response.data;
});

export const getLeave = createAsyncThunk("leave/get", async (id: string) => {
    const response = await axios.get(`/api/leaves/${id}`);

    return response.data;
});

export const addLeave = createAsyncThunk(
    "leave/add",
    async (values: LeaveProps) => {
        const response = await axios.post("/api/leaves", values);

        return response.data;
    }
);

export const editLeave = createAsyncThunk(
    "leave/edit",
    async (values: LeaveProps) => {
        const response = await axios.patch(`/api/leaves/${values._id}`, values);

        return response.data;
    }
);

export const deleteLeave = createAsyncThunk(
    "leave/delete",
    async (id: string) => {
        await axios.delete(`/api/leaves/${id}`);

        return id;
    }
);

export default leaveSlice.reducer;
