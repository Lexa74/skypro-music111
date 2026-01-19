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

const loadInitialTokens = () => {
    if (typeof window === "undefined") {
        return { accessToken: null, refreshToken: null };
    }
    return {
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: localStorage.getItem("refreshToken"),
    };
};

const loadInitialState = (): InitialStateType => {
    if (typeof window === "undefined") {
        return {
            user: null,
            accessToken: null,
            refreshToken: null,
            error: null,
        };
    }

    const savedUser = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    let parsedUser: User | null = null;
    if (savedUser) {
        try {
            parsedUser = JSON.parse(savedUser) as User;
        } catch (e) {
            console.error("Ошибка парсинга user из localStorage", e);
        }
    }

    return {
        user: parsedUser,
        accessToken,
        refreshToken,
        error: null,
    };
};

const initialState: InitialStateType = loadInitialState();

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
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
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        },
    },
});
export const { setUser, setTokens, logout } = userSlice.actions;

export const userSliceReducer = userSlice.reducer;