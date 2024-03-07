import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { EditorProps } from "react-draft-wysiwyg";

interface LeaveTypeState {
    data: any[];
    isLoading: boolean;
    error: any;
}

interface LeaveTypeProps {
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
    },
});

export const getLeaveTypes = createAsyncThunk(
    "leave-types/getAll",
    async () => {
        const response = await axios.get("/api/leave-types");

        return response.data;
    }
);

export const addLeaveType = createAsyncThunk(
    "leave-types/add",
    async (values: LeaveTypeProps) => {
        const response = await axios.post("/api/leave-types", values);

        return response.data;
    }
);

export default leaveTypeSlice.reducer;
