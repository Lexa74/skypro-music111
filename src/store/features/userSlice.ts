import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    _id: number;
    username: string;
    email: string;
}

type InitialStateType = {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    error: string | null;
};

const initialState: InitialStateType = {
    user: null,
    accessToken: null,
    refreshToken: null,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.error = null;
        },
        setTokens: (
            state,
            action: PayloadAction<{ access: string; refresh: string }>
        ) => {
            state.accessToken = action.payload.access;
            state.refreshToken = action.payload.refresh;
            localStorage.setItem("accessToken", action.payload.access);
            localStorage.setItem("refreshToken", action.payload.refresh);
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.error = null;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        },
    },
});

export const { setUser, setTokens, setError, logout } = userSlice.actions;

export const userSliceReducer = userSlice.reducer;