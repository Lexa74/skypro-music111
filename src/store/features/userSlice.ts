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
    hydrated: boolean;
};

const initialState: InitialStateType = {
    user: null,
    accessToken: null,
    refreshToken: null,
    error: null,
    hydrated: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setHydrated: (state, action: PayloadAction<boolean>) => {
            state.hydrated = action.payload;
        },

        hydrateFromStorage: (state) => {
            const savedUser = localStorage.getItem("user");
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            state.user = savedUser ? (JSON.parse(savedUser) as User) : null;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.hydrated = true;
        },

        setUser: (
            state,
            action: PayloadAction<{ _id: number; username: string; email: string }>
        ) => {
            state.user = action.payload;
            state.error = null;
            localStorage.setItem("user", JSON.stringify(action.payload));
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

        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.error = null;
            state.hydrated = true;
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        },
    },
});
export const { setHydrated, hydrateFromStorage, setUser, setTokens, logout } = userSlice.actions;

export const userSliceReducer = userSlice.reducer;