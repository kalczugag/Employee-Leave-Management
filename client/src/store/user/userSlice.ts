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
                        data: action.payload?.user,
                        isAuthenticated: action.payload?.isAuthenticated,
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
                        data: action.payload?.user,
                        isAuthenticated: action.payload?.isAuthenticated,
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
                        data: action.payload?.user,
                        isAuthenticated: action.payload?.isAuthenticated,
                        isLoading: false,
                    };
                }
            )
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });

        builder
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                return {
                    ...state,
                    initialState,
                };
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });
    },
});

export const register = createAsyncThunk(
    "user/register",
    async (data: user) => {
        try {
            const response = await axios.post("/api/auth/register", data);

            if (response.status === 200) {
                window.location.href = "/login";
            }

            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
);

export const login = createAsyncThunk(
    "user/login",
    async (data: { email: string; password: string }) => {
        try {
            const response = await axios.post("/api/auth/login", data);

            if (response.status === 200) {
                window.location.href = "/";
            }

            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
);

export const getUser = createAsyncThunk("user/get", async () => {
    try {
        const response = await axios.get("/api/auth/current_user");

        return response.data;
    } catch (err: any | unknown) {
        console.error(err);

        switch (err.response.status) {
            case 403:
                window.location.href = "/login";
                break;
            case 503:
                window.location.href = "/login";
                break;
            default:
                throw err;
        }
    }
});

export const logout = createAsyncThunk("user/logout", async () => {
    try {
        const response = await axios.get("/api/auth/logout");

        return response.data;
    } catch (err) {
        console.error(err);
    }
});

export default userSlice.reducer;
