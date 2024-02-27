import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import useNavigate from "../../hooks/useNavigate";

interface UserState {
    data: any;
    isLoading: boolean;
    error: any;
}

const initialState: UserState = {
    data: null,
    isLoading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });

        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });
    },
});

export const register = createAsyncThunk(
    "user/register",
    async (data: user) => {
        const response = await axios.post("/api/auth/register", data);

        return response.data;
    }
);

export const login = createAsyncThunk(
    "user/login",
    async (data: { email: string; password: string }) => {
        const response = await axios.post("/api/auth/login", data);

        return response.data;
    }
);

export default userSlice.reducer;
