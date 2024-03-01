import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
    data: any;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: any;
}

interface authPayload {
    user: user;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    data: null,
    isAuthenticated: false,
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
            .addCase(
                register.fulfilled,
                (state, action: PayloadAction<authPayload>) => {
                    return {
                        ...state,
                        data: action.payload.user,
                        isAuthenticated: action.payload.isAuthenticated,
                        isLoading: false,
                    };
                }
            )
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });

        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                login.fulfilled,
                (state, action: PayloadAction<authPayload>) => {
                    return {
                        ...state,
                        data: action.payload.user,
                        isAuthenticated: action.payload.isAuthenticated,
                        isLoading: false,
                    };
                }
            )
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });

        builder
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                getUser.fulfilled,
                (state, action: PayloadAction<authPayload>) => {
                    return {
                        ...state,
                        data: action.payload.user,
                        isAuthenticated: action.payload.isAuthenticated,
                        isLoading: false,
                    };
                }
            )
            .addCase(getUser.rejected, (state, action) => {
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

export const getUser = createAsyncThunk("user/get", async () => {
    const response = await axios.get("/api/auth/current_user");

    return response.data;
});

export default userSlice.reducer;
