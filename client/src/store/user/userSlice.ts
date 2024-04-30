import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
    data: user | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: any;
    resetPage: number;
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
    resetPage: 0,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthPage(state, action: PayloadAction<number>) {
            state.resetPage = action.payload || 0;
        },
    },
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

        builder
            .addCase(verifyEmail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                verifyEmail.fulfilled,
                (state, action: PayloadAction<string>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            isLoading: false,
                            resetPage: 1,
                        };
                    }

                    return {
                        ...state,
                        isLoading: false,
                        error: "Email not found",
                    };
                }
            )
            .addCase(verifyEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });

        builder
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                return {
                    ...state,
                    initialState,
                };
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });

        builder
            .addCase(changePassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(
                changePassword.rejected,
                (state, action: PayloadAction<any>) => {
                    state.isLoading = false;
                    state.error = action.payload.message;
                }
            );
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
        const response = await axios.post("/api/auth/login", data);

        if (response.status === 200) {
            window.location.href = "/";
        }

        return response.data;
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

export const verifyEmail = createAsyncThunk(
    "user/verify",
    async (email: string) => {
        const response = await axios.post("/api/auth/verify", { email });

        return response.data;
    }
);

export const resetPassword = createAsyncThunk(
    "user/reset",
    async (data: { email: string; password: string }) => {
        const response = await axios.patch("/api/auth/reset", data);

        if (response.status === 200) {
            window.location.href = "/login";
        }

        return response.data;
    }
);

export const changePassword = createAsyncThunk(
    "user/change_password",
    async (
        data: {
            currentPassword: string;
            newPassword: string;
            confirmNewPassword: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.patch(
                "/api/auth/change_password",
                data
            );
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            } else if (error.request) {
                return rejectWithValue({
                    error: "No response received from the server",
                });
            } else {
                return rejectWithValue({ error: error.message });
            }
        }
    }
);

export const { setAuthPage } = userSlice.actions;

export default userSlice.reducer;
