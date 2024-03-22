import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { EditorProps } from "react-draft-wysiwyg";

interface LeaveTypeState {
    data: any[];
    isLoading: boolean;
    error: any;
}

interface LeaveTypeProps {
    _id?: string;
    name: string;
    shortName?: string;
    details?: EditorProps;
    active?: boolean;
}

const initialState: LeaveTypeState = {
    data: [],
    isLoading: false,
    error: null,
};

const leaveTypeSlice = createSlice({
    name: "leaveType",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getLeaveTypes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLeaveTypes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getLeaveTypes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });

        builder
            .addCase(getLeaveType.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLeaveType.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data.push(action.payload);
            })
            .addCase(getLeaveType.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });

        builder
            .addCase(addLeaveType.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addLeaveType.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data.push(action.payload);
            })
            .addCase(addLeaveType.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });

        builder
            .addCase(editLeaveType.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                editLeaveType.fulfilled,
                (state, action: PayloadAction<LeaveTypeProps>) => {
                    state.isLoading = false;
                    const editedLeaveType = action.payload;

                    const index = state.data.findIndex(
                        (lt: LeaveTypeProps) => lt._id === editedLeaveType._id
                    );

                    if (index !== -1) {
                        state.data[index] = {
                            ...state.data[index],
                            name: editedLeaveType?.name,
                            shortName: editedLeaveType?.shortName,
                            details: editedLeaveType?.details,
                            active: editedLeaveType?.active,
                        };
                    }
                }
            )
            .addCase(editLeaveType.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });

        builder
            .addCase(deleteLeaveType.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteLeaveType.fulfilled, (state, action) => {
                state.isLoading = false;

                state.data = state.data.filter((lt: LeaveTypeProps) => {
                    return lt._id !== action.payload;
                });
            })
            .addCase(deleteLeaveType.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });
    },
});

export const getLeaveTypes = createAsyncThunk(
    "leave-type/getAll",
    async (selectQuery: string) => {
        let response: AxiosResponse<any, any>;

        if (selectQuery) {
            response = await axios.get("/api/leave-types", {
                params: { fields: selectQuery },
            });
        } else {
            response = await axios.get("/api/leave-types");
        }

        return response.data;
    }
);

export const getLeaveType = createAsyncThunk(
    "leave-type/get",
    async (id: string) => {
        const response = await axios.get(`/api/leave-types/${id}`);

        return response.data;
    }
);

export const addLeaveType = createAsyncThunk(
    "leave-type/add",
    async (values: LeaveTypeProps) => {
        const response = await axios.post("/api/leave-types", values);

        return response.data;
    }
);

export const editLeaveType = createAsyncThunk(
    "leave-type/edit",
    async (values: LeaveTypeProps) => {
        const response = await axios.patch(
            `/api/leave-types/${values._id}`,
            values
        );

        return response.data;
    }
);

export const deleteLeaveType = createAsyncThunk(
    "leave-type/delete",
    async (id: string) => {
        await axios.delete(`/api/leave-types/${id}`);

        return id;
    }
);

export default leaveTypeSlice.reducer;
