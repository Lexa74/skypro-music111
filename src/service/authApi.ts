const API_BASE = "https://webdev-music-003b5b991590.herokuapp.com/user/";

export const signup = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE}signup/`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "content-type": "application/json" },
    });

    if (response.status === 201) {
        return await response.json();
    } else if (response.status === 403) {
        const data = await response.json();
        throw new Error(data.message || "Registration failed");
    } else {
        throw new Error("Server error");
    }
};

export const login = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE}login/`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "content-type": "application/json" },
    });

    if (response.status === 200) {
        return await response.json();
    } else if (response.status === 400 || response.status === 401) {
        const data = await response.json();
        throw new Error(data.message || "Invalid credentials");
    } else {
        throw new Error("Server error");
    }
};

export const getToken = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE}token/`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "content-type": "application/json" },
    });

    if (response.status === 200) {
        return await response.json();
    } else if (response.status === 400 || response.status === 401) {
        const data = await response.json();
        throw new Error(data.message || "Token retrieval failed");
    } else {
        throw new Error("Server error");
    }
};

export const refreshToken = async (refresh: string) => {
    const response = await fetch(`${API_BASE}token/refresh/`, {
        method: "POST",
        body: JSON.stringify({ refresh }),
        headers: { "content-type": "application/json" },
    });

    if (response.status === 200) {
        return await response.json();
    } else if (response.status === 401) {
        const data = await response.json();
        throw new Error(data.detail || "Invalid refresh token");
    } else {
        throw new Error("Server error");
    }
};